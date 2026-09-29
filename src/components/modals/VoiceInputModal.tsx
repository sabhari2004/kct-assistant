import { useState, useEffect } from 'react';
import { X, Mic } from 'lucide-react';

interface VoiceInputModalProps {
  onClose: () => void;
  onDone: (transcript: string) => void;
}

const mockTranscripts = [
  'What subjects are offered in MCA Semester 2?',
  'When is the next semester examination?',
  'What are the eligibility requirements for MCA?',
  'What is the placement eligibility criteria?',
  'What are the library timings?',
];

export default function VoiceInputModal({ onClose, onDone }: VoiceInputModalProps) {
  const [listening, setListening] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [dots, setDots] = useState('');

  // Simulate transcript appearing
  useEffect(() => {
    if (!listening) return;
    const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTranscript(randomTranscript.slice(0, i * 3));
      if (i * 3 >= randomTranscript.length) {
        clearInterval(interval);
        setListening(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    if (!listening) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, [listening]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-sm scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Voice Input</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col items-center gap-5">
          {/* Animated mic */}
          <div className="relative">
            {listening && (
              <>
                <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-900 mic-pulse scale-150 opacity-30" />
                <div className="absolute inset-0 rounded-full bg-indigo-300 dark:bg-indigo-800 mic-pulse scale-125 opacity-20" style={{ animationDelay: '0.3s' }} />
              </>
            )}
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${listening ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <Mic size={28} className={listening ? 'text-white' : 'text-gray-500 dark:text-gray-400'} />
            </div>
          </div>

          {/* Status */}
          <div className="text-center">
            <p className={`text-sm font-semibold ${listening ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
              {listening ? `Listening${dots}` : 'Done listening'}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-gray-300 min-h-[56px] border border-gray-200 dark:border-gray-700">
              {transcript}
              {listening && <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 animate-pulse" />}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onDone(transcript)}
            disabled={!transcript}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 text-sm font-medium text-white transition-colors"
          >
            Use This
          </button>
        </div>
      </div>
    </div>
  );
}
