/**
 * Chat service — Firestore persistence.
 * Conversations are stored per authenticated user under:
 *   /users/{userId}/conversations/{conversationId}
 */

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import type { Conversation, Message } from '../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getUserId(): string {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.uid;
}

function convRef(userId: string) {
  return collection(db, 'users', userId, 'conversations');
}

/** Convert Firestore Timestamp or Date to JS Date */
function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date();
}

// ─── Service Functions ────────────────────────────────────────────────────────

/** Fetch all conversations for the current user, newest first */
export async function getConversations(): Promise<Conversation[]> {
  const uid = getUserId();
  const q = query(convRef(uid), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title || 'Untitled',
      messages: (data.messages || []).map((m: Record<string, unknown>) => ({
        ...m,
        timestamp: toDate(m.timestamp),
      })) as Message[],
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  });
}

/** Fetch a single conversation by ID */
export async function getConversation(id: string): Promise<Conversation | null> {
  const uid = getUserId();
  const snap = await getDoc(doc(convRef(uid), id));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    title: data.title || 'Untitled',
    messages: (data.messages || []).map((m: Record<string, unknown>) => ({
      ...m,
      timestamp: toDate(m.timestamp),
    })) as Message[],
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

/** Create a new conversation document in Firestore */
export async function createConversation(firstMessage: string): Promise<Conversation> {
  const uid = getUserId();
  const title = firstMessage.slice(0, 60);
  const now = serverTimestamp();
  const ref = await addDoc(convRef(uid), {
    title,
    messages: [],
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: ref.id,
    title,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/** Append a message to a conversation document */
export async function addMessage(
  conversationId: string,
  message: Omit<Message, 'id'>
): Promise<Message> {
  const uid = getUserId();
  const newMessage: Message = {
    ...message,
    id: `msg-${Date.now()}`,
    timestamp: message.timestamp instanceof Date ? message.timestamp : new Date(),
  };

  const ref = doc(convRef(uid), conversationId);
  const snap = await getDoc(ref);
  const existing = snap.exists() ? (snap.data().messages || []) : [];

  await updateDoc(ref, {
    messages: [...existing, {
      ...newMessage,
      timestamp: Timestamp.fromDate(newMessage.timestamp as Date),
    }],
    updatedAt: serverTimestamp(),
  });

  return newMessage;
}

/** Delete a conversation */
export async function deleteConversation(id: string): Promise<void> {
  const uid = getUserId();
  await deleteDoc(doc(convRef(uid), id));
}

/** Rename a conversation */
export async function renameConversation(id: string, title: string): Promise<void> {
  const uid = getUserId();
  await updateDoc(doc(convRef(uid), id), { title, updatedAt: serverTimestamp() });
}
