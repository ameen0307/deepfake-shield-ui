import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, HelpCircle } from "lucide-react";
import { DetectionResult } from "@/lib/types";
import FrameTimeline from "./FrameTimeline";

interface ResultDisplayProps {
  result: DetectionResult;
}

const config = {
  REAL: {
    icon: ShieldCheck,
    label: "AUTHENTIC",
    subtitle: "No deepfake manipulation detected",
    colorClass: "text-success",
    bgClass: "bg-success/10 border-success/20",
    glowClass: "glow-success",
    barClass: "bg-success",
  },
  FAKE: {
    icon: ShieldAlert,
    label: "DEEPFAKE DETECTED",
    subtitle: "Manipulation artifacts identified",
    colorClass: "text-danger",
    bgClass: "bg-danger/10 border-danger/20",
    glowClass: "glow-danger",
    barClass: "bg-danger",
  },
  UNCERTAIN: {
    icon: HelpCircle,
    label: "INCONCLUSIVE",
    subtitle: "Unable to determine with high confidence",
    colorClass: "text-warning",
    bgClass: "bg-warning/10 border-warning/20",
    glowClass: "glow-warning",
    barClass: "bg-warning",
  },
};

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const c = config[result.label];
  const Icon = c.icon;
  const pct = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Media preview */}
      {result.mediaUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl overflow-hidden border border-border bg-muted/20"
        >
          {result.mediaType === "video" ? (
            <video 
              src={result.mediaUrl} 
              controls 
              className="w-full max-h-96 object-contain"
            />
          ) : (
            <img 
              src={result.mediaUrl} 
              alt="Analyzed media" 
              className="w-full max-h-96 object-contain"
            />
          )}
        </motion.div>
      )}

      {/* Main result card */}
      <div className={`glass-card p-6 border ${c.bgClass} ${c.glowClass}`}>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${c.bgClass}`}
          >
            <Icon className={`w-7 h-7 ${c.colorClass}`} />
          </motion.div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold font-mono tracking-wider ${c.colorClass}`}>
              {c.label}
            </h3>
            <p className="text-muted-foreground text-sm">{c.subtitle}</p>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              Confidence Level
            </span>
            <span className={`text-sm font-mono font-bold ${c.colorClass}`}>{pct}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${c.barClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Video timeline */}
      {result.timeline && result.timeline.length > 0 && (
        <FrameTimeline timeline={result.timeline} />
      )}
    </motion.div>
  );
}
