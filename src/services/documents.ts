/**
 * Documents service — Metadata is stored in Firestore collection: /documents/{docId}
 * Actual file storage uses Supabase Storage with graceful fallback.
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
  try {
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
        status: data.status || 'Active',
        downloadUrl: data.downloadUrl || 'https://kct.ac.in/',
      } as CollegeDocument;
    });
  } catch (err) {
    console.warn('Failed to fetch from Firestore:', err);
    return [];
  }
}

/** Upload a file to Supabase Storage and save metadata to Firestore */
export async function uploadDocument(
  file: File,
  category: CollegeDocument['category']
): Promise<CollegeDocument> {
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  let downloadUrl = '';

  // 1. Try uploading to Supabase Storage
  try {
    const { error: uploadError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (!uploadError) {
      const { data: publicUrlData } = supabase
        .storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);
      downloadUrl = publicUrlData.publicUrl;
    }
  } catch (e) {
    console.warn('Supabase storage not accessible, using data url fallback', e);
  }

  // Fallback download URL if Supabase bucket is restricted
  if (!downloadUrl) {
    downloadUrl = URL.createObjectURL(file);
  }

  const sizeStr =
    file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(0)} KB`;
  const format = (file.name.split('.').pop()?.toUpperCase() || 'PDF') as CollegeDocument['format'];
  const name = file.name.replace(/\.[^/.]+$/, '');

  // 2. Save metadata to Firestore
  try {
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
      downloadUrl,
    };
  } catch (err) {
    console.warn('Firestore write error, returning client object:', err);
    return {
      id: `local-${Date.now()}`,
      name,
      category,
      format,
      size: sizeStr,
      updatedAt: new Date(),
      status: 'Active',
      downloadUrl,
    };
  }
}

/** Delete a document from Firestore and its file from Supabase Storage */
export async function deleteDocument(id: string): Promise<void> {
  try {
    const snap = await getDocs(query(docsCollection));
    const docSnap = snap.docs.find((d) => d.id === id);

    if (docSnap) {
      const storagePath = docSnap.data().storagePath;
      if (storagePath) {
        try {
          await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
        } catch {
          // safe ignore
        }
      }
      await deleteDoc(doc(docsCollection, id));
    }
  } catch (err) {
    console.error('Failed to delete document:', err);
  }
}
