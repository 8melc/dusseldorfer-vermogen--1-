
// @/utils/dataModels.ts

/**
 * Represents a single block of content within an article.
 * Can be a paragraph, a heading, a list, etc.
 */
export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "quote";
  content: string;
}

/**
 * Defines the structure for a financial article,
 * specifically for content from "Rheinberg Privatbank".
 */
export interface RheinbergInsight {
  id?: string; // Optional: Firestore document ID
  title: string;
  subtitle: string;
  body: ContentBlock[];
  published_at: string; // ISO 8601 date string
  source: string;
  canonical_url: string;
}

/**
 * Defines the structure for an audio snippet linked to an article.
 * The audio file itself is stored in Firebase Storage, and the URL is saved here.
 */
export interface AudioSnippet {
  id?: string; // Optional: Firestore document ID
  article_id: string; // Reference to the RheinbergInsight document ID
  voice_gender: "male" | "female";
  created_at: string; // ISO 8601 date string
  audio_url: string; // URL to the audio file in Firebase Storage
  duration_seconds: number;
}
