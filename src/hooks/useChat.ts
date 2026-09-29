/**
 * useChat — Persistent chat hook with Firestore.
 *
 * Supports two modes:
 *   1. New chat  — no conversationId param → starts fresh
 *   2. Resume    — conversationId provided → loads existing from Firestore
 *
 * Firestore path: /users/{uid}/conversations/{convId}
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, Conversation } from '../types';
import { sendMessageToAI } from '../services/groq';
import { auth, db } from '../services/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseChatOptions {
  /** Firestore conversation ID to load and resume */
  conversationId?: string | null;
  /** Pre-fill the input or auto-send an initial question */
  initialQuestion?: string | null;
}

interface UseChatReturn {
  conversation: Conversation | null;
  isTyping: boolean;
  loadingHistory: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
  startNewChat: () => void;
  updateMessageFeedback: (messageId: string, liked: boolean | null) => void;
}

// ─── Firestore helpers ────────────────────────────────────────────────────────

function userConvsRef(uid: string) {
  return collection(db, 'users', uid, 'conversations');
}

function msgToFirestore(m: Message) {
  return {
    id: m.id,
    role: m.role,
    content: m.content,
    timestamp: Timestamp.fromDate(
      m.timestamp instanceof Date ? m.timestamp : new Date()
    ),
    ...(m.sources ? { sources: m.sources } : {}),
    ...(m.liked !== undefined && m.liked !== null ? { liked: m.liked } : {}),
  };
}

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date();
}

function firestoreDocToConversation(id: string, data: Record<string, unknown>): Conversation {
  return {
    id,
    title: (data.title as string) || 'Untitled',
    messages: ((data.messages as Record<string, unknown>[]) || []).map((m) => ({
      id: m.id as string,
      role: m.role as 'user' | 'assistant',
      content: m.content as string,
      timestamp: toDate(m.timestamp),
      sources: m.sources as string[] | undefined,
      liked: m.liked as boolean | null | undefined,
    })),
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { conversationId, initialQuestion } = options;

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tracks the live Firestore document ID
  const firestoreIdRef = useRef<string | null>(null);
  const localIdRef = useRef(0);
  // Prevent double-send when initialQuestion is set
  const initialSentRef = useRef(false);

  // ── Load existing conversation from Firestore ──────────────────────────────
  useEffect(() => {
    if (!conversationId) return;

    const uid = auth.currentUser?.uid;
    if (!uid) return;

    setLoadingHistory(true);
    const ref = doc(userConvsRef(uid), conversationId);
    getDoc(ref)
      .then((snap) => {
        if (snap.exists()) {
          const conv = firestoreDocToConversation(snap.id, snap.data() as Record<string, unknown>);
          setConversation(conv);
          firestoreIdRef.current = snap.id;
        }
      })
      .catch((err) => console.warn('Failed to load conversation:', err))
      .finally(() => setLoadingHistory(false));
  }, [conversationId]);

  // ── Auto-send initialQuestion (from sidebar category clicks) ───────────────
  useEffect(() => {
    if (!initialQuestion || initialSentRef.current) return;
    if (conversationId) return; // Don't auto-send when resuming
    initialSentRef.current = true;
    // Small delay so the page has mounted
    const t = setTimeout(() => sendMessage(initialQuestion), 100);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  // ── Core send function ─────────────────────────────────────────────────────
  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setError(null);

    // Capture history BEFORE state update (prevents duplicate in AI call)
    let historyBeforeThisMessage: Message[] = [];
    let isFirstMessage = false;
    let localTitle = '';

    setConversation((prev) => {
      if (!prev) {
        localIdRef.current += 1;
        isFirstMessage = true;
        historyBeforeThisMessage = [];
        localTitle = content.slice(0, 60);
        return {
          id: `conv-local-${localIdRef.current}`,
          title: localTitle,
          messages: [userMessage],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      historyBeforeThisMessage = prev.messages;
      localTitle = prev.title;
      return {
        ...prev,
        messages: [...prev.messages, userMessage],
        updatedAt: new Date(),
      };
    });

    setIsTyping(true);

    try {
      const aiContent = await sendMessageToAI(content, historyBeforeThisMessage);
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
        sources: ['KCT Knowledge Base'],
      };

      setConversation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, aiMessage],
          updatedAt: new Date(),
        };
      });

      // ── Persist to Firestore ─────────────────────────────────────────────
      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          if (isFirstMessage && !firestoreIdRef.current) {
            // Create new Firestore document
            const ref = await addDoc(userConvsRef(uid), {
              title: localTitle,
              messages: [msgToFirestore(userMessage), msgToFirestore(aiMessage)],
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            firestoreIdRef.current = ref.id;
          } else if (firestoreIdRef.current) {
            // Append new messages to existing document
            const ref = doc(userConvsRef(uid), firestoreIdRef.current);
            const snap = await getDoc(ref);
            const existing = snap.exists() ? (snap.data().messages ?? []) : [];
            await updateDoc(ref, {
              messages: [
                ...existing,
                msgToFirestore(userMessage),
                msgToFirestore(aiMessage),
              ],
              updatedAt: serverTimestamp(),
            });
          }
        } catch (fsErr) {
          console.warn('Firestore save failed (chat still works):', fsErr);
        }
      }
    } catch {
      setError('Unable to send message. Something went wrong. Please try again.');
    } finally {
      setIsTyping(false);
    }
  }, []);

  const updateMessageFeedback = useCallback(
    (messageId: string, liked: boolean | null) => {
      setConversation((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: prev.messages.map((m) =>
            m.id === messageId ? { ...m, liked } : m
          ),
        };
      });
    },
    []
  );

  const startNewChat = useCallback(() => {
    setConversation(null);
    setError(null);
    setIsTyping(false);
    firestoreIdRef.current = null;
    initialSentRef.current = false;
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    conversation,
    isTyping,
    loadingHistory,
    error,
    sendMessage,
    clearError,
    startNewChat,
    updateMessageFeedback,
  };
}
