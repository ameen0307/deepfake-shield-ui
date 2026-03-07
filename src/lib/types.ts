export interface User {
  username: string;
}

export interface HistoryItem {
  id: number;
  filename: string;
  filepath: string;
  prediction: "REAL" | "FAKE" | "UNCERTAIN";
  confidence: number;
  timestamp: string;
  fileType: "image" | "video";
  previewUrl?: string;
}

export interface DetectionResult {
  label: "REAL" | "FAKE" | "UNCERTAIN";
  confidence: number;
  timeline?: number[];
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export type AppView = "upload" | "result";
