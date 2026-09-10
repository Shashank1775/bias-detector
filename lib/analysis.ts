/**
 * Shared types and display metadata for the text-analysis feature.
 *
 * This module is imported by both the API route (server) and the detector UI
 * (client), so it must stay free of server-only code (no SDK imports here).
 */

/** The four categories the analyzer scores. Order here drives chart/legend order. */
export const CATEGORIES = ["bias", "misinformation", "hateSpeech", "stereotypes"] as const;
export type Category = (typeof CATEGORIES)[number];

/** Human-readable label and chart colour for each category (matches the original mock palette). */
export const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  bias: { label: "Bias", color: "#ff6347" },
  misinformation: { label: "Misinformation", color: "#ffa500" },
  hateSpeech: { label: "Hate Speech", color: "#ff4500" },
  stereotypes: { label: "Stereotypes", color: "#ffd700" },
};

/** One flagged passage from the submitted text. */
export interface Highlight {
  /** Verbatim excerpt from the input. */
  quote: string;
  category: Category;
  /** Why this passage was flagged, written for a general reader. */
  explanation: string;
}

/** Response body of `POST /api/analyzeText` on success. */
export interface AnalysisResult {
  /** 0-100 severity score per category (0 = none detected, 100 = pervasive/severe). */
  bias: number;
  misinformation: number;
  hateSpeech: number;
  stereotypes: number;
  /** Short plain-language overview of the findings. */
  summary: string;
  highlights: Highlight[];
}

/** Optional context the user supplies about where the text came from. */
export interface AnalysisContext {
  source?: string;
  purpose?: string;
  date?: string;
}

/** Request body of `POST /api/analyzeText`. */
export interface AnalysisRequest {
  text: string;
  /** Only "text" is supported today; video/speech/photo are placeholders in the UI. */
  type: "text";
  context?: AnalysisContext;
}

/** Error body returned by the API on any non-2xx response. */
export interface AnalysisError {
  error: string;
}

/** Input limits enforced by the API and mirrored in the UI. */
export const MIN_TEXT_LENGTH = 10;
export const MAX_TEXT_LENGTH = 20_000;
