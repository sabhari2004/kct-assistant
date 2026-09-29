import { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Check, Database } from 'lucide-react';
import type { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
  onFeedback?: (liked: boolean | null) => void;
  onRegenerate?: () => void;
}

function renderMarkdown(content: string): string {
  return content
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) return '';
      return `<tr>${cells.map(c => `<td class="px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-sm">${c}</td>`).join('')}</tr>`;
    })
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1.5">$1</h3>')
    // Numbered list items
    .replace(/^\d+\.\s(.+)$/gm, '<li class="text-sm text-gray-700 dark:text-gray-300 ml-4 list-decimal">$1</li>')
    // Bullet list items
    .replace(/^[-*]\s(.+)$/gm, '<li class="text-sm text-gray-700 dark:text-gray-300 ml-4 list-disc">$1</li>')
    // Blockquote
    .replace(/^>\s(.+)$/gm, '<blockquote class="border-l-2 border-indigo-300 dark:border-indigo-700 pl-3 text-xs text-gray-500 dark:text-gray-400 italic my-2">$1</blockquote>')
    // Paragraph breaks
    .replace(/\n\n/g, '</p><p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">');
}

export default function ChatMessage({ message, onFeedback, onRegenerate }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 message-appear">
        <div className="flex flex-col items-end gap-1 max-w-[75%] sm:max-w-[60%]">
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
            {message.content}
          </div>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 px-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 ml-2 mt-0.5 border border-indigo-200 dark:border-indigo-800">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">SS</span>
        </div>
      </div>
    );
  }

  // AI message
  const rendered = renderMarkdown(message.content);

  return (
    <div className="flex gap-3 mb-4 message-appear">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-800">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">AI</span>
      </div>

      <div className="flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%]">
        {/* Label */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">AI Assistant</span>
          {message.sources && message.sources.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900">
              <Database size={9} />
              Based on college information
            </span>
          )}
        </div>

        {/* Bubble */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
          {rendered.includes('<table') ? (
            <div className="prose-sm">
              <table className="w-full border-collapse text-left mb-2">
                <tbody
                  dangerouslySetInnerHTML={{
                    __html: rendered.replace(/<\/?tr>/g, '').replace(/<\/?td[^>]*>/g, ''),
                  }}
                />
              </table>
            </div>
          ) : (
            <div
              className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_tr]:border-b [&_tr]:border-gray-100 [&_td]:py-1.5 [&_td]:px-3 [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-gray-700"
              dangerouslySetInnerHTML={{
                __html: `<p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">${rendered}</p>`,
              }}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 px-1">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 mr-1">
            {formatTime(message.timestamp)}
          </span>

          <button
            onClick={handleCopy}
            title="Copy"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
          </button>

          <button
            onClick={() => onFeedback?.(message.liked === true ? null : true)}
            title="Helpful"
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              message.liked === true
                ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <ThumbsUp size={13} />
          </button>

          <button
            onClick={() => onFeedback?.(message.liked === false ? null : false)}
            title="Not helpful"
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              message.liked === false
                ? 'text-red-500 bg-red-50 dark:bg-red-950/50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <ThumbsDown size={13} />
          </button>

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              title="Regenerate"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
