import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import FileUploadModal from '../modals/FileUploadModal';
import VoiceInputModal from '../modals/VoiceInputModal';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceDone = (transcript: string) => {
    setValue(transcript);
    setVoiceOpen(false);
  };

  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
        {/* Disclaimer */}
        <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mb-2">
          AI can make mistakes. Verify important college information.
        </p>

        {/* Input box */}
        <div className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 transition-all">
          {/* Left actions */}
          <div className="flex items-center gap-1 pb-1">
            <button
              onClick={() => setUploadOpen(true)}
              title="Attach file"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Paperclip size={17} />
            </button>
            <button
              onClick={() => setVoiceOpen(true)}
              title="Voice input"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Mic size={17} />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none py-1.5 max-h-40 leading-relaxed scrollbar-thin"
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            title="Send message"
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all flex-shrink-0 pb-1 ${
              value.trim() && !disabled
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={15} />
          </button>
        </div>

        {/* Character count hint */}
        {value.length > 200 && (
          <p className="text-[10px] text-gray-400 text-right mt-1 pr-1">
            {value.length} characters
          </p>
        )}
      </div>

      {uploadOpen && <FileUploadModal onClose={() => setUploadOpen(false)} />}
      {voiceOpen && <VoiceInputModal onClose={() => setVoiceOpen(false)} onDone={handleVoiceDone} />}
    </>
  );
}
