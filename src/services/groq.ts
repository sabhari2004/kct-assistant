/**
 * Groq AI Service — KCT AI Assistant
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses direct fetch with automatic multi-model fallback and message history trimming.
 * Models: openai/gpt-oss-120b -> openai/gpt-oss-20b -> groq/compound-mini
 */

import type { Message } from '../types';
import { buildKctContext } from './kctContext';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Models in order of preference
const PRIMARY_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODELS = ['openai/gpt-oss-20b', 'groq/compound-mini'];

// ─── System Prompt ────────────────────────────────────────────────────────────

const KCT_SYSTEM_PROMPT = `You are KCT AI Assistant, the official AI assistant for Kumaraguru College of Technology (KCT), Coimbatore, Tamil Nadu, India.

You answer questions specifically and helpfully about Kumaraguru College of Technology.

═══════════════════════════════════════════════════════════
CORE RULES:
═══════════════════════════════════════════════════════════
1. FACTUAL ACCURACY:
- Prioritize verified KCT facts provided in context.
- KCT MCA is strictly a 2-year (4-semester) postgraduate programme (NEVER 3 years).
- For scholarships: KCT offers Mahatma Gandhi (MG) Merit Scholarship, Achiever Scholarship, Sports Scholarship, and government scholarships.
- If information is not in the knowledge base, provide helpful guidance and direct the student to the official website (https://kct.ac.in/) or admissions office (0422-2661100).

2. LANGUAGE PREFERENCE:
- If user speaks in English -> answer in English.
- If user speaks in Tamil -> answer in Tamil.
- If user speaks in Tanglish (e.g., "scholarship epdi apply panradhu?") -> reply in Tanglish or Tamil.
- Continue in the user's preferred language throughout the conversation.

3. STYLE & TONE:
- Be student-friendly, concise, clear, and structured with bullet points.
- Use markdown formatting with clear headings and bullet points.`;

// ─── AI Service Function ──────────────────────────────────────────────────────

async function tryGenerate(
  model: string,
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  apiKey: string
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6,
        max_tokens: 1024,
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Groq model ${model} failed (${response.status}):`, errText);
      return null;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch (err) {
    console.warn(`Fetch error for model ${model}:`, err);
    return null;
  }
}

/**
 * Send a message to Groq with context and conversation history.
 */
export async function sendMessageToAI(
  userMessage: string,
  chatHistory: Message[] = [],
  extraContext: string[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    console.error('VITE_GROQ_API_KEY is not configured');
    return 'AI service is not configured. Please contact support or check settings.';
  }

  try {
    // 1. Build verified KCT context
    const kctContext = buildKctContext();
    const allContext = [...kctContext, ...extraContext];

    // 2. Keep only the last 8 conversation messages to avoid payload limits
    const recentHistory = chatHistory.slice(-8).map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // 3. Assemble messages
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: KCT_SYSTEM_PROMPT },
      { role: 'system', content: `VERIFIED KCT KNOWLEDGE BASE:\n${allContext.join('\n')}` },
      ...recentHistory,
      { role: 'user', content: userMessage },
    ];

    // 4. Try primary model first
    const candidateModels = [PRIMARY_MODEL, ...FALLBACK_MODELS];
    for (const model of candidateModels) {
      const result = await tryGenerate(model, messages, apiKey);
      if (result) {
        return result;
      }
    }

    return "I'm having a brief connection issue with the AI service. Please ask your question again.";
  } catch (error) {
    console.error('Groq AI service error:', error);
    return "I couldn't process your request right now. Please check your network connection and try again.";
  }
}

export const groqServiceInfo = {
  initialized: true,
  provider: 'Groq',
  model: PRIMARY_MODEL,
  features: ['conversation-history', 'kct-context', 'language-memory', 'auto-fallback'],
};