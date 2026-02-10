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
    console.warn("Backend not available, using mock analysis");
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 2500));

    const isVideo = file.type.startsWith("video");
    const rand = Math.random();
    const label = rand > 0.6 ? "FAKE" : rand > 0.2 ? "REAL" : "UNCERTAIN";
    const confidence = 0.6 + Math.random() * 0.35;
    const timeline = isVideo
      ? Array.from({ length: 20 }, () => Math.random())
      : undefined;

    return { label, confidence, timeline };
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
