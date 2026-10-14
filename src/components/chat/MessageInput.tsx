import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, FileText, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { extractTextFromFile, type ExtractedDocument } from '../../services/documentExtractor';
import VoiceInputModal from '../modals/VoiceInputModal';

interface MessageInputProps {
  onSend: (message: string, attachment?: ExtractedDocument | null) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState('');
  const [attachment, setAttachment] = useState<ExtractedDocument | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsReadingFile(true);
    try {
      const extracted = await extractTextFromFile(file);
      setAttachment(extracted);
    } catch (err) {
      console.error('File read error:', err);
    } finally {
      setIsReadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if ((!trimmed && !attachment) || disabled || isReadingFile) return;

    onSend(trimmed, attachment);
    setValue('');
    setAttachment(null);
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

  const hasContent = Boolean(value.trim() || attachment);

  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md,.csv,.json"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Disclaimer */}
        <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mb-2">
          AI can make mistakes. Verify important college information.
        </p>

        {/* Document Reading Loader */}
        {isReadingFile && (
          <div className="max-w-3xl mx-auto flex items-center gap-2 mb-2 p-2 px-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 animate-pulse">
            <Loader2 size={14} className="animate-spin text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium">Reading document content for AI Q&amp;A...</span>
          </div>
        )}

        {/* Attached Document Chip (ChatGPT style) */}
        {attachment && (
          <div className="max-w-3xl mx-auto flex items-center justify-between mb-2 p-2 px-3.5 bg-indigo-50/90 dark:bg-indigo-950/80 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <FileText size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[220px] sm:max-w-sm">
                  {attachment.fileName}
                </p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400">
                  {attachment.fileSize} · Document attached (Ask questions about it)
                </p>
              </div>
            </div>
            <button
              onClick={() => setAttachment(null)}
              title="Remove attachment"
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-indigo-200/50 dark:hover:bg-indigo-900 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Input box */}
        <div className="max-w-3xl mx-auto flex items-end gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 transition-all">
          {/* Left actions */}
          <div className="flex items-center gap-1 pb-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach document to ask questions"
              disabled={isReadingFile || disabled}
              className={`w-8 h-8 flex items-center justify-center rounded-xl transition-colors ${
                attachment
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-100/60 dark:bg-indigo-950'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Paperclip size={17} />
            </button>
            <button
              type="button"
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
            placeholder={
              attachment
                ? `Ask anything about ${attachment.fileName}...`
                : t.placeholder
            }
            disabled={disabled || isReadingFile}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none py-1.5 max-h-40 leading-relaxed scrollbar-thin"
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!hasContent || disabled || isReadingFile}
            title="Send message"
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all flex-shrink-0 pb-1 ${
              hasContent && !disabled && !isReadingFile
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={15} />
          </button>
        </div>

        {/* Character count hint */}
        {value.length > 200 && (
          <p className="text-[10px] text-gray-400 text-right mt-1 pr-1 max-w-3xl mx-auto">
            {value.length} characters
          </p>
        )}
      </div>

      {voiceOpen && <VoiceInputModal onClose={() => setVoiceOpen(false)} onDone={handleVoiceDone} />}
    </>
  );
}
