nimport { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { generateAuditPDF } from '../utils/generateAuditPDF';

const ExportAuditReportButton = ({ results = [] }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    if (isGenerating || results.length === 0) return;

    setIsGenerating(true);
    try {
      await generateAuditPDF({ results });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || results.length === 0;

  return (
    <button
      onClick={handleExport}
      disabled={isDisabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200
        ${isDisabled 
          ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }
      `}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating Report...
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          Export Audit Report
        </>
      )}
    </button>
  );
};

export default ExportAuditReportButton;

