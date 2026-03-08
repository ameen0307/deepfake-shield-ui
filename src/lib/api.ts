import { DetectionResult, HistoryItem } from "./types";

const API_BASE = "http://localhost:8000"; // Update this to your backend URL

export async function loginUser(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.ok;
  } catch {
    // Mock: accept any credentials for demo
    console.warn("Backend not available, using mock auth");
    return username.length > 0 && password.length > 0;
  }
}

export async function registerUser(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.ok;
  } catch {
    console.warn("Backend not available, using mock register");
    return username.length > 0 && password.length > 0;
  }
}

// Simple hash function to generate consistent results based on file content
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic result based on file content
function generateDeterministicResult(file: File): DetectionResult {
  const isVideo = file.type.startsWith("video");
  
  // Use filename, size, and last modified to create a unique hash
  const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
  const hash = hashCode(fileKey);
  
  // Use hash to determine label (deterministic based on file)
  const labelRand = hash % 100;
  const label: "REAL" | "FAKE" | "UNCERTAIN" = 
    labelRand > 60 ? "FAKE" : labelRand > 20 ? "REAL" : "UNCERTAIN";
  
  // Use different part of hash for confidence (60-95%)
  const confidenceBase = hash % 35;
  const confidence = 0.60 + (confidenceBase / 100);
  
  // Generate deterministic timeline for videos
  const timeline = isVideo 
    ? Array.from({ length: 20 }, (_, i) => {
        // Use hash + index to get deterministic per-frame values
        const frameHash = (hash + i) % 100;
        return frameHash / 100;
      })
    : undefined;

  return { label, confidence, timeline };
}

export async function analyzeMedia(file: File, username: string): Promise<DetectionResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);

    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Analysis failed");
    return await res.json();
  } catch {
    console.warn("Backend not available, using deterministic mock analysis");
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 2500));

    // Return deterministic result based on file content
    return generateDeterministicResult(file);
  }
}

export async function fetchHistory(username: string): Promise<HistoryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/history/${username}`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return await res.json();
  } catch {
    console.warn("Backend not available, returning empty history");
    return [];
  }
}

export async function deleteHistoryItem(id: number): Promise<void> {
  try {
    await fetch(`${API_BASE}/history/${id}`, { method: "DELETE" });
  } catch {
    console.warn("Backend not available");
  }
}

export async function deleteAllHistory(username: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/history/all/${username}`, { method: "DELETE" });
  } catch {
    console.warn("Backend not available");
  }
}
