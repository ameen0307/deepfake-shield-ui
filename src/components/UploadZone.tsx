import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Film, X, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isAnalyzing: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/quicktime", "video/x-msvideo"];

export default function UploadZone({ onFileSelected, isAnalyzing }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<{ url: string; type: "image" | "video"; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) return;
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";
    setPreview({ url, type, name: file.name });
    onFileSelected(file);
  }, [onFileSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearPreview = () => {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-12 text-center ${
              dragOver
                ? "border-primary bg-primary/5 glow-primary"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.mp4,.mov,.avi"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />

            <motion.div
              animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">
                  Drop media file here or click to browse
                </p>
                <p className="text-muted-foreground text-sm">
                  Supports JPG, PNG, MP4, MOV, AVI
                </p>
              </div>
              <div className="flex gap-6 text-muted-foreground">
                <span className="flex items-center gap-1.5 text-xs">
                  <Image className="w-3.5 h-3.5" /> Images
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <Film className="w-3.5 h-3.5" /> Videos
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-xl overflow-hidden border border-border"
          >
            {!isAnalyzing && (
              <Button
                size="icon"
                variant="ghost"
                onClick={clearPreview}
                className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            )}

            {preview.type === "image" ? (
              <img src={preview.url} alt="Preview" className="w-full max-h-80 object-contain bg-muted/20" />
            ) : (
              <video src={preview.url} controls className="w-full max-h-80 bg-muted/20" />
            )}

            {isAnalyzing && (
              <motion.div
                className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Scan className="w-10 h-10 text-primary" />
                </motion.div>
                <p className="text-primary font-mono text-sm font-medium">ANALYZING MEDIA...</p>
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            <div className="px-4 py-3 bg-muted/30 border-t border-border flex items-center gap-2">
              {preview.type === "image" ? <Image className="w-4 h-4 text-muted-foreground" /> : <Film className="w-4 h-4 text-muted-foreground" />}
              <span className="text-sm text-muted-foreground font-mono truncate">{preview.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
