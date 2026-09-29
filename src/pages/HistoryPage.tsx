import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Pencil, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import {
  getConversations,
  deleteConversation,
  renameConversation,
} from '../services/chat';
import type { Conversation, ConversationGroup } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/** Group conversations into Today / Yesterday / Past 7 days / Older */
function groupConversations(convs: Conversation[]): ConversationGroup[] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOf7Days = new Date(startOfToday);
  startOf7Days.setDate(startOf7Days.getDate() - 7);

  const groups: { label: string; threshold: Date }[] = [
    { label: 'Today', threshold: startOfToday },
    { label: 'Yesterday', threshold: startOfYesterday },
    { label: 'Past 7 days', threshold: startOf7Days },
    { label: 'Older', threshold: new Date(0) },
  ];

  const result: ConversationGroup[] = [];

  for (const { label, threshold } of groups) {
    const matched = convs.filter((c) => {
      const t = c.updatedAt instanceof Date ? c.updatedAt : new Date();
      if (label === 'Today') return t >= startOfToday;
      if (label === 'Yesterday') return t >= startOfYesterday && t < startOfToday;
      if (label === 'Past 7 days') return t >= startOf7Days && t < startOfYesterday;
      return t < startOf7Days;
    });

    if (matched.length > 0) {
      result.push({
        label,
        conversations: matched.map((c) => ({
          id: c.id,
          title: c.title,
          preview: c.messages[c.messages.length - 1]?.content?.slice(0, 80) || '',
          updatedAt: c.updatedAt instanceof Date ? c.updatedAt : new Date(),
        })),
      });
    }

    void threshold; // suppress unused warning for older groups
  }

  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [groups, setGroups] = useState<ConversationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const navigate = useNavigate();

  // Load real conversations from Firestore
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getConversations()
      .then((convs) => {
        if (!cancelled) {
          setGroups(groupConversations(convs));
        }
      })
      .catch((err) => {
        console.warn('Failed to load conversations:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleDelete = async (convId: string) => {
    setMenuOpen(null);
    // Optimistic remove from UI
    setGroups((prev) =>
      prev
        .map((g) => ({ ...g, conversations: g.conversations.filter((c) => c.id !== convId) }))
        .filter((g) => g.conversations.length > 0)
    );
    try {
      await deleteConversation(convId);
    } catch (err) {
      console.warn('Delete failed:', err);
    }
  };

  const handleRenameStart = (convId: string, currentTitle: string) => {
    setRenamingId(convId);
    setRenameValue(currentTitle);
    setMenuOpen(null);
  };

  const handleRenameSubmit = async (convId: string) => {
    if (!renameValue.trim()) { setRenamingId(null); return; }
    const newTitle = renameValue.trim();
    setRenamingId(null);
    // Optimistic update
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        conversations: g.conversations.map((c) =>
          c.id === convId ? { ...c, title: newTitle } : c
        ),
      }))
    );
    try {
      await renameConversation(convId, newTitle);
    } catch (err) {
      console.warn('Rename failed:', err);
    }
  };

  const totalConvs = groups.reduce((a, g) => a + g.conversations.length, 0);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat History</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? 'Loading...' : `${totalConvs} conversation${totalConvs !== 1 ? 's' : ''}`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-indigo-400" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare size={40} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No conversations yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Start a new chat to see your history here.
            </p>
            <button
              onClick={() => navigate('/chat')}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Start Chatting
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.label}>
                <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
                  {group.label}
                </h2>
                <div className="space-y-1">
                  {group.conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all relative"
                    >
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => navigate(`/chat?conv=${conv.id}`)}
                      >
                        {renamingId === conv.id ? (
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => handleRenameSubmit(conv.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(conv.id)}
                            className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-b border-indigo-400 outline-none w-full"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {conv.title}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
                          {conv.preview}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          {timeAgo(conv.updatedAt)}
                        </span>

                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpen(menuOpen === conv.id ? null : conv.id);
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal size={14} />
                          </button>

                          {menuOpen === conv.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 overflow-hidden scale-in">
                              <button
                                onClick={() => handleRenameStart(conv.id, conv.title)}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full whitespace-nowrap"
                              >
                                <Pencil size={12} /> Rename
                              </button>
                              <button
                                onClick={() => handleDelete(conv.id)}
                                className="flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full whitespace-nowrap"
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
