import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, Image, Film, ShieldCheck, ShieldAlert, HelpCircle, LogOut, Trash } from "lucide-react";
import { HistoryItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface HistorySidebarProps {
  history: HistoryItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
  onLogout: () => void;
  username: string;
}

const predictionIcon = {
  REAL: <ShieldCheck className="w-3.5 h-3.5 text-success" />,
  FAKE: <ShieldAlert className="w-3.5 h-3.5 text-danger" />,
  UNCERTAIN: <HelpCircle className="w-3.5 h-3.5 text-warning" />,
};

export default function HistorySidebar({
  history,
  selectedId,
  onSelect,
  onDelete,
  onDeleteAll,
  onLogout,
  username,
}: HistorySidebarProps) {
  return (
    <div className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Operator</span>
          <Button variant="ghost" size="icon" onClick={onLogout} className="h-7 w-7 text-muted-foreground hover:text-destructive">
            <LogOut className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-sm font-medium text-sidebar-foreground truncate">{username}</p>
      </div>

      {/* History header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" /> History
        </span>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteAll}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash className="w-3 h-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <AnimatePresence>
          {history.length === 0 ? (
            <div className="px-2 py-8 text-center text-muted-foreground text-xs">
              No analysis history yet
            </div>
          ) : (
            history.map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => onSelect(item.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 mb-1 transition-all group ${
                  selectedId === item.id
                    ? "bg-sidebar-accent border border-sidebar-border"
                    : "hover:bg-sidebar-accent/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.fileType === "image" ? (
                    <Image className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <Film className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <span className="text-xs text-sidebar-foreground truncate flex-1 font-mono">
                    {item.filename}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {predictionIcon[item.prediction]}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.prediction} · {Math.round(item.confidence * 100)}%
                  </span>
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
