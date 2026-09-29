/**
 * Documents service — Metadata is stored in Firestore collection: /documents/{docId}
 * Actual file storage uses Supabase Storage for free tier limits.
 */

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { supabase } from './supabase';
import type { CollegeDocument } from '../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date();
}

const docsCollection = collection(db, 'documents');
const BUCKET_NAME = 'documents';

// ─── Service Functions ────────────────────────────────────────────────────────

/** Fetch all documents from Firestore, newest first */
export async function getDocuments(): Promise<CollegeDocument[]> {
  const q = query(docsCollection, orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      category: data.category,
      format: data.format,
      size: data.size,
      updatedAt: toDate(data.updatedAt),
      status: data.status,
      downloadUrl: data.downloadUrl,
    } as CollegeDocument;
  });
}

/** Upload a file to Supabase Storage and save metadata to Firestore */
export async function uploadDocument(
  file: File,
  category: CollegeDocument['category']
): Promise<CollegeDocument> {
  if (!import.meta.env.VITE_SUPABASE_URL) {
    throw new Error("Supabase is not configured! Please add your Supabase URL and Key to the .env file.");
  }

  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
  // 1. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    console.error("Supabase Upload Error:", uploadError);
    throw new Error(`Failed to upload to Supabase: ${uploadError.message}`);
  }

  // 2. Get Public URL
  const { data: publicUrlData } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);
    
  const downloadUrl = publicUrlData.publicUrl;
  const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
  const format = (file.name.split('.').pop()?.toUpperCase() || 'PDF') as CollegeDocument['format'];
  const name = file.name.replace(/\.[^/.]+$/, '');

  // 3. Save metadata to Firestore
  const docRef = await addDoc(docsCollection, {
    name,
    category,
    format,
    size: sizeStr,
    status: 'Active',
    downloadUrl,
    storagePath: fileName,
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name,
    category,
    format,
    size: sizeStr,
    updatedAt: new Date(),
    status: 'Active',
  };
}

/** Delete a document from Firestore and its file from Supabase Storage */
export async function deleteDocument(id: string): Promise<void> {
  if (!import.meta.env.VITE_SUPABASE_URL) {
    throw new Error("Supabase is not configured!");
  }

  // Get the document to find its storage path
  const snap = await getDocs(query(docsCollection));
  const docSnap = snap.docs.find((d) => d.id === id);

  if (docSnap) {
    const storagePath = docSnap.data().storagePath;
    
    // Delete from Supabase Storage if path exists
    if (storagePath) {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
      if (error) {
        console.warn('Supabase storage file delete failed:', error.message);
      }
    }
    
    // Delete from Firestore
    await deleteDoc(doc(docsCollection, id));
  }
}
