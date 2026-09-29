/**
 * ChatPage — reads URL search params to support:
 *   /chat             → new conversation
 *   /chat?conv=ID     → resume existing conversation from history
 *   /chat?q=text      → new conversation with pre-sent question (sidebar categories)
 */
import { useSearchParams } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import ChatWindow from '../components/chat/ChatWindow';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conv');
  const initialQuestion = searchParams.get('q');

  const {
    conversation,
    isTyping,
    loadingHistory,
    error,
    sendMessage,
    clearError,
    updateMessageFeedback,
  } = useChat({ conversationId, initialQuestion });

  return (
    <ChatWindow
      conversation={conversation}
      isTyping={isTyping}
      loadingHistory={loadingHistory}
      error={error}
      onSend={sendMessage}
      onFeedback={updateMessageFeedback}
      onClearError={clearError}
    />
  );
}
