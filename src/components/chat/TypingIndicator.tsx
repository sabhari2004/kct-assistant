export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 message-appear">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-800">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">AI</span>
      </div>

      {/* Bubble */}
      <div className="flex flex-col gap-1 max-w-xs">
        <div className="flex items-center gap-1.5 px-1">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">AI Assistant</span>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 px-1 italic">
          AI Assistant is thinking...
        </p>
      </div>
    </div>
  );
}
