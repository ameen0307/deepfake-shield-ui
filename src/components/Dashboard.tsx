import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Plus } from "lucide-react";
import { DetectionResult, HistoryItem } from "@/lib/types";
import { analyzeMedia } from "@/lib/api";
import UploadZone from "./UploadZone";
import ResultDisplay from "./ResultDisplay";
import HistorySidebar from "./HistorySidebar";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleFileSelected = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    setSelectedId(null);

    // Create preview URL for the file
    const previewUrl = URL.createObjectURL(file);
    const mediaType = file.type.startsWith("video") ? "video" : "image";

    try {
      const res = await analyzeMedia(file, username);
      // Add media URL and type to result
      setResult({
        ...res,
        mediaUrl: previewUrl,
        mediaType: mediaType,
      });

      const newItem: HistoryItem = {
        id: Date.now(),
        filename: file.name,
        filepath: file.name,
        prediction: res.label,
        confidence: res.confidence,
        timestamp: new Date().toISOString(),
        fileType: mediaType,
        previewUrl: previewUrl,
      };
      setHistory((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error("Analysis failed:", err);
      // Revoke URL on error
      URL.revokeObjectURL(previewUrl);
    } finally {
      setIsAnalyzing(false);
    }
  }, [username]);

  const handleSelectHistory = (id: number) => {
    setSelectedId(id);
    const item = history.find((h) => h.id === id);
    if (item) {
      setResult({
        label: item.prediction,
        confidence: item.confidence,
        mediaUrl: item.previewUrl,
        mediaType: item.fileType,
      });
    }
  };

  const handleDeleteItem = (id: number) => {
    const item = history.find((h) => h.id === id);
    if (item?.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
    setHistory((prev) => prev.filter((h) => h.id !== id));
    if (selectedId === id) {
      if (result?.mediaUrl) {
        URL.revokeObjectURL(result.mediaUrl);
      }
      setSelectedId(null);
      setResult(null);
    }
  };

  const handleDeleteAll = () => {
    // Clean up all preview URLs
    history.forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    if (result?.mediaUrl) {
      URL.revokeObjectURL(result.mediaUrl);
    }
    setHistory([]);
    setSelectedId(null);
    setResult(null);
  };

  const handleNewAnalysis = () => {
    // Clean up media URL if it exists
    if (result?.mediaUrl) {
      URL.revokeObjectURL(result.mediaUrl);
    }
    setResult(null);
    setSelectedId(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <HistorySidebar
        history={history}
        selectedId={selectedId}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteItem}
        onDeleteAll={handleDeleteAll}
        onLogout={onLogout}
        username={username}
      />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-mono tracking-tight">
                Deepfake Detection
              </h1>
              <p className="text-xs text-muted-foreground">
                AI-powered forensic media analysis
              </p>
            </div>
          </motion.div>

          {/* Upload zone */}
          {!result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <UploadZone onFileSelected={handleFileSelected} isAnalyzing={isAnalyzing} />
            </motion.div>
          )}

          {/* Result */}
          {result && !isAnalyzing && (
            <>
              <ResultDisplay result={result} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center"
              >
                <Button
                  variant="outline"
                  onClick={handleNewAnalysis}
                  className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                >
                  <Plus className="w-4 h-4 mr-2" /> New Analysis
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
