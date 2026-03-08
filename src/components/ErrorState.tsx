import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export default function ErrorState({ title = "Error", message, onDismiss }: ErrorStateProps) {
  return (
    <div className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-sm font-medium mb-1">{title}</h4>
        <p className="text-sm">{message}</p>
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="h-6 w-6 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
