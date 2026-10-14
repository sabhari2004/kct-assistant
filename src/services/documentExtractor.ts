/**
 * Document Content Extractor
 * ─────────────────────────────────────────────────────────────────────────────
 * Extracts raw readable text from user-uploaded files (PDF, TXT, CSV, MD, JSON)
 * so the AI can read, summarize, and answer questions directly about the file.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Use verified CDN worker to avoid Vite bundler worker issues
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

export interface ExtractedDocument {
  fileName: string;
  fileSize: string;
  text: string;
  preview: string;
}

/** Extract text from a File object */
export async function extractTextFromFile(file: File): Promise<ExtractedDocument> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const sizeStr =
    file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(0)} KB`;

  let fullText = '';

  try {
    if (extension === 'pdf') {
      fullText = await extractTextFromPdf(file);
    } else {
      // Text, Markdown, CSV, JSON, code, etc.
      fullText = await file.text();
    }
  } catch (err) {
    console.warn('Primary file extractor warning, using fallback text reader:', err);
    try {
      fullText = await file.text();
    } catch {
      fullText = `[Attached Document: ${file.name} (${sizeStr})]`;
    }
  }

  // Trim and limit to maximum 12,000 characters to stay within LLM context
  const cleanText = fullText.replace(/\s+/g, ' ').trim();
  const truncatedText = cleanText.length > 12000 ? cleanText.slice(0, 12000) + '... [truncated]' : cleanText;
  const preview = truncatedText.slice(0, 120) + (truncatedText.length > 120 ? '...' : '');

  return {
    fileName: file.name,
    fileSize: sizeStr,
    text: truncatedText,
    preview,
  };
}

async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let textContent = '';
  const maxPages = Math.min(pdf.numPages, 15); // process up to 15 pages

  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const tokenized = await page.getTextContent();
    const pageStrings = tokenized.items
      .map((item: any) => item.str || '')
      .filter(Boolean);
    textContent += `\n--- Page ${i} ---\n` + pageStrings.join(' ');
  }

  return textContent.trim();
}
