import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import MessageInput from './MessageInput';
import type { Conversation } from '../../types';
import { AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

interface ChatWindowProps {
  conversation: Conversation | null;
  isTyping: boolean;
  loadingHistory: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onFeedback: (messageId: string, liked: boolean | null) => void;
  onClearError: () => void;
}

export default function ChatWindow({
  conversation,
  isTyping,
  loadingHistory,
  error,
  onSend,
  onFeedback,
  onClearError,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages, isTyping]);

  // Show spinner while loading a conversation from history
  if (loadingHistory) {
    return (
      <div className="flex flex-col flex-1 min-h-0 items-center justify-center">
        <Loader2 size={32} className="animate-spin text-indigo-400 mb-3" />
        <p className="text-sm text-gray-400 dark:text-gray-500">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 sm:px-6">
        {!conversation || conversation.messages.length === 0 ? (
          <WelcomeScreen onSuggestion={onSend} />
        ) : (
          <div className="max-w-3xl mx-auto">
            {conversation.messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onFeedback={
                  msg.role === 'assistant'
                    ? (liked) => onFeedback(msg.id, liked)
                    : undefined
                }
              />
            ))}

            {isTyping && <TypingIndicator />}

            {error && (
              <div className="flex items-start gap-3 mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl message-appear">
                <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    Unable to send message
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">{error}</p>
                </div>
                <button
                  onClick={onClearError}
                  className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:text-red-800 font-medium transition-colors"
                >
                  <RefreshCw size={12} />
                  Try Again
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} disabled={isTyping || loadingHistory} />
    </div>
  );
}
