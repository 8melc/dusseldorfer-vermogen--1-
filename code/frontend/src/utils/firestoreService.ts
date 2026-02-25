
// @/utils/firestoreService.ts

import { firebaseApp } from "app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import type { RheinbergInsight, AudioSnippet } from "./dataModels";

// Initialize Firebase services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// --- Collection References ---
const insightsCollection = collection(db, "rheinberg_insights");
const snippetsCollection = collection(db, "audio_snippets");

// --- Rheinberg Privatbank Insights Service ---

/**
 * Adds a new Rheinberg Privatbank insight article to Firestore.
 * @param article The article data to add.
 * @returns The ID of the newly created document.
 */
export const addInsight = async (
  article: Omit<RheinbergInsight, "id">,
): Promise<string> => {
  const docRef = await addDoc(insightsCollection, article);
  return docRef.id;
};

/**
 * Retrieves all Rheinberg Privatbank insight articles from Firestore.
 * @returns An array of articles with their Firestore IDs.
 */
export const getInsights = async (): Promise<RheinbergInsight[]> => {
  const snapshot = await getDocs(insightsCollection);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as RheinbergInsight),
  );
};

/**
 * Retrieves a single Rheinberg Privatbank insight article by its ID.
 * @param id The document ID of the article.
 * @returns The article data or null if not found.
 */
export const getInsightById = async (
  id: string,
): Promise<RheinbergInsight | null> => {
  const docRef = doc(db, "rheinberg_insights", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as RheinbergInsight;
  }
  return null;
};

// --- Audio Snippets Service ---

/**
 * Uploads an audio file to Firebase Storage.
 * @param file The audio file (Blob or File).
 * @param articleId The ID of the article this audio belongs to.
 * @returns The public URL of the uploaded file.
 */
export const uploadAudio = async (
  file: Blob | File,
  articleId: string,
): Promise<string> => {
  // Create a unique path for the audio file
  const filePath = `audio_snippets/${articleId}/${Date.now()}.mp3`;
  const storageRef = ref(storage, filePath);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the public download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/**
 * Adds a new audio snippet's metadata to Firestore.
 * @param snippet The snippet data to add (should include the audio_url from storage).
 * @returns The ID of the newly created document.
 */
export const addAudioSnippet = async (
  snippet: Omit<AudioSnippet, "id">,
): Promise<string> => {
  const docRef = await addDoc(snippetsCollection, snippet);
  return docRef.id;
};

/**
 * Retrieves all audio snippets for a specific article.
 * @param articleId The ID of the article.
 * @returns An array of audio snippets.
 */
export const getAudioSnippetsForArticle = async (
  articleId: string,
): Promise<AudioSnippet[]> => {
  const q = query(snippetsCollection, where("article_id", "==", articleId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as AudioSnippet),
  );
};
