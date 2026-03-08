import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  // Cover Page
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 30,
  },
  coverDivider: {
    width: 150,
    height: 2,
    backgroundColor: '#2563eb',
    marginBottom: 30,
  },
  coverInfo: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 1.8,
  },
  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 8,
  },
  // Executive Summary
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  // Finding
  finding: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#6b7280',
  },
  findingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  findingId: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666',
  },
  severityBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
  },
  severityHigh: {
    color: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  severityMedium: {
    color: '#ea580c',
    backgroundColor: '#fff7ed',
  },
  severityLow: {
    color: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  findingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  findingLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 3,
  },
  findingText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#999999',
  },
  // Description text
  description: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  // Statistics boxes
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    width: '30%',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    color: '#666666',
    textTransform: 'uppercase',
  },
});

// Helper to get severity color
const getSeverityStyle = (severity) => {
  switch (severity?.toUpperCase()) {
    case 'HIGH':
      return styles.severityHigh;
    case 'MEDIUM':
      return styles.severityMedium;
    case 'LOW':
      return styles.severityLow;
    default:
      return styles.severityMedium;
  }
};

// Helper to convert deepfake label to severity
const getSeverityFromPrediction = (prediction) => {
  if (prediction === 'FAKE') return 'HIGH';
  if (prediction === 'UNCERTAIN') return 'MEDIUM';
  return 'LOW';
};

// Cover Page Component
const CoverPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.coverPage}>
      <Text style={styles.coverTitle}>SYSTEM ANALYSIS AUDIT REPORT</Text>
      <Text style={styles.coverSubtitle}>Automated Security and Integrity Analysis</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverInfo}>
        Generated: {data.generatedDate}{'\n'}
        Report ID: {data.reportId}{'\n'}
        Application: {data.applicationName}{'\n'}
        Version: {data.version || '1.0.0'}
      </Text>
    </View>
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>{data.applicationName}</Text>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber}`
      )} />
    </View>
  </Page>
);

// Executive Summary Page
const ExecutiveSummaryPage = ({ data }) => {
  const highCount = data.findings?.filter(f => f.severity === 'HIGH').length || 0;
  const mediumCount = data.findings?.filter(f => f.severity === 'MEDIUM').length || 0;
  const lowCount = data.findings?.filter(f => f.severity === 'LOW').length || 0;
  const total = highCount + mediumCount + lowCount;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <Text style={styles.description}>
        This report presents the findings from the automated media integrity analysis performed by {data.applicationName}. 
        The analysis evaluates media files for potential manipulation indicators and provides detailed findings with recommendations.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#1a1a1a' }]}>{total}</Text>
          <Text style={styles.statLabel}>Total Findings</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#dc2626' }]}>{highCount}</Text>
          <Text style={styles.statLabel}>High Severity</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#ea580c' }]}>{mediumCount}</Text>
          <Text style={styles.statLabel}>Medium Severity</Text>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Analysis Date</Text>
          <Text style={styles.summaryValue}>{data.generatedDate}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Files Analyzed</Text>
          <Text style={styles.summaryValue}>{data.totalFiles || data.findings?.length || 0}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Report ID</Text>
          <Text style={styles.summaryValue}>{data.reportId}</Text>
        </View>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{data.applicationName}</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber}`
        )} />
      </View>
    </Page>
  );
};

// Findings Page
const FindingsPage = ({ data }) => (
  <Page size="A4" style={styles.page} wrap>
    <Text style={styles.sectionTitle}>Detailed Findings</Text>
    
    {data.findings && data.findings.length > 0 ? (
      data.findings.map((finding, index) => (
        <View 
          key={index} 
          style={[
            styles.finding, 
            { borderLeftColor: finding.severity === 'HIGH' ? '#dc2626' : finding.severity === 'MEDIUM' ? '#ea580c' : '#16a34a' }
          ]}
        >
          <View style={styles.findingHeader}>
            <Text style={styles.findingId}>Finding ID: {finding.id || `F-${String(index + 1).padStart(3, '0')}`}</Text>
            <Text style={[styles.severityBadge, getSeverityStyle(finding.severity)]}>
              {finding.severity}
            </Text>
          </View>
          <Text style={styles.findingTitle}>{finding.title}</Text>
          
          <Text style={styles.findingLabel}>Description:</Text>
          <Text style={styles.findingText}>{finding.description}</Text>
          
          {finding.recommendation && (
            <>
              <Text style={styles.findingLabel}>Recommendation:</Text>
              <Text style={styles.findingText}>{finding.recommendation}</Text>
            </>
          )}
        </View>
      ))
    ) : (
      <View style={styles.finding}>
        <Text style={styles.findingTitle}>No findings to report</Text>
        <Text style={styles.findingText}>
          The analysis did not identify any significant issues in the analyzed media files.
        </Text>
      </View>
    )}

    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>{data.applicationName}</Text>
      <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber}`
      )} />
    </View>
  </Page>
);

// Main PDF Document
const AuditReportPDF = ({ data }) => (
  <Document>
    <CoverPage data={data} />
    <ExecutiveSummaryPage data={data} />
    <FindingsPage data={data} />
  </Document>
);

export default AuditReportPDF;

