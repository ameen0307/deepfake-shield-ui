import { pdf } from '@react-pdf/renderer';
import AuditReportPDF from '../components/reports/AuditReportPDF';

/**
 * Generates a unique report ID
 * @returns {string} Report ID in format AR-XXXX
 */
const generateReportId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'AR-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Gets the current date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Converts deepfake analysis results to audit findings format
 * @param {Array} results - Array of analysis results
 * @returns {Array} Formatted findings array
 */
const convertResultsToFindings = (results) => {
  if (!results || results.length === 0) return [];

  return results.map((result, index) => {
    const prediction = result.result?.label || 'UNKNOWN';
    const confidence = result.result?.confidence || 0;
    const confidencePercent = Math.round(confidence * 100);

    let severity;
    let title;
    let description;
    let recommendation;

    if (prediction === 'FAKE') {
      severity = 'HIGH';
      title = `Media File Manipulation Detected - ${result.file?.name || `File ${index + 1}`}`;
      description = `The analyzed file "${result.file?.name || `File ${index + 1}`}" shows indicators of digital manipulation. The detection system identified the content as potentially fake with ${confidencePercent}% confidence. This could indicate AI-generated content or deliberate alteration.`;
      recommendation = '1. Verify the source of the media file.\n2. Conduct manual forensic analysis.\n3. Document the findings for further investigation.\n4. Consider additional verification methods.';
    } else if (prediction === 'UNCERTAIN') {
      severity = 'MEDIUM';
      title = `Analysis Inconclusive - ${result.file?.name || `File ${index + 1}`}`;
      description = `The analysis of "${result.file?.name || `File ${index + 1}`}" returned an uncertain result with ${confidencePercent}% confidence. The detection system could not confidently determine whether the content is authentic or manipulated.`;
      recommendation = '1. Re-analyze the file using different parameters.\n2. Use additional forensic tools for verification.\n3. If possible, obtain the original source file for comparison.\n4. Consider human expert review.';
    } else {
      severity = 'LOW';
      title = `Media Authenticity Verified - ${result.file?.name || `File ${index + 1}`}`;
      description = `The analyzed file "${result.file?.name || `File ${index + 1}`}" appears to be authentic with ${confidencePercent}% confidence. No significant manipulation indicators were detected by the analysis system.`;
      recommendation = '1. Continue standard verification procedures.\n2. Document the analysis result for records.\n3. Monitor for any new manipulation techniques.';
    }

    return {
      id: `F-${String(index + 1).padStart(3, '0')}`,
      severity,
      title,
      description,
      recommendation,
    };
  });
};

/**
 * Generates an audit PDF report from analysis results
 * @param {Object} params - Report generation parameters
 * @param {Array} params.results - Array of analysis results with file and result data
 * @param {string} params.applicationName - Name of the application (default: 'Deepfake Detector')
 * @param {string} params.version - Version of the application
 * @returns {Promise<void>} Resolves when download is triggered
 */
export const generateAuditPDF = async ({ 
  results = [], 
  applicationName = 'Deepfake Detector',
  version = '1.0.0'
}) => {
  const generatedDate = getCurrentDate();
  const reportId = generateReportId();
  const findings = convertResultsToFindings(results);

  const reportData = {
    generatedDate,
    reportId,
    applicationName,
    version,
    findings,
    totalFiles: results.length,
  };

  // Generate the PDF
  const blob = await pdf(<AuditReportPDF data={reportData} />).toBlob();
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `audit-report-${generatedDate}.pdf`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};

export default generateAuditPDF;

