import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Page settings
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  
  // ==================== TYPOGRAPHY ====================
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 8,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#374151',
  },
  bodyText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.6,
    marginBottom: 12,
  },
  
  // ==================== COVER PAGE ====================
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 15,
  },
  confidentialityLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
  
  // ==================== HEADER ====================
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerLeft: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  headerRight: {
    fontSize: 10,
    color: '#6b7280',
  },
  
  // ==================== FOOTER ====================
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
  footerLeft: {
    fontSize: 9,
    color: '#999999',
  },
  footerRight: {
    fontSize: 9,
    color: '#999999',
  },
  
  // ==================== TABLE OF CONTENTS ====================
  tocContainer: {
    marginBottom: 20,
  },
  tocTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  tocEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tocText: {
    fontSize: 11,
    color: '#374151',
  },
  tocPage: {
    fontSize: 11,
    color: '#6b7280',
  },
  
  // ==================== RISK SCORE ====================
  riskScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  riskScoreBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  riskScoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  riskScoreLabel: {
    fontSize: 9,
    color: '#666666',
    textTransform: 'uppercase',
  },
  
  // ==================== SEVERITY SUMMARY CARDS ====================
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    flex: 1,
    padding: 15,
    marginHorizontal: 4,
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
    textAlign: 'center',
  },
  
  // ==================== FINDINGS SUMMARY TABLE ====================
  table: {
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    padding: 10,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    padding: 10,
  },
  tableCell: {
    fontSize: 9,
    color: '#4b5563',
  },
  tableCellId: {
    width: '12%',
  },
  tableCellTitle: {
    width: '38%',
  },
  tableCellSeverity: {
    width: '15%',
  },
  tableCellCategory: {
    width: '20%',
  },
  tableCellStatus: {
    width: '15%',
  },
  
  // ==================== SEVERITY BADGES ====================
  severityBadge: {
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    textAlign: 'center',
    overflow: 'hidden',
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
  
  // ==================== FINDING CARD ====================
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
  findingDivider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
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
  
  // ==================== CATEGORY TAG ====================
  categoryTag: {
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
  },
  
  // ==================== RECOMMENDATIONS SECTION ====================
  recommendationBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#16a34a',
  },
  recommendationTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 10,
    color: '#166534',
    lineHeight: 1.5,
  },
  
  // ==================== PRIORITY RECOMMENDATIONS ====================
  prioritySection: {
    marginBottom: 25,
  },
  priorityGroup: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 4,
  },
  priorityCritical: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  priorityImportant: {
    backgroundColor: '#fff7ed',
    borderLeftWidth: 3,
    borderLeftColor: '#ea580c',
  },
  priorityOptional: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 3,
    borderLeftColor: '#16a34a',
  },
  priorityTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priorityCriticalTitle: {
    color: '#dc2626',
  },
  priorityImportantTitle: {
    color: '#ea580c',
  },
  priorityOptionalTitle: {
    color: '#16a34a',
  },
  priorityItem: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 4,
    paddingLeft: 10,
  },
  
  // ==================== METHODOLOGY SECTION ====================
  methodologyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  methodologyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  methodologyText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.6,
  },
  
  // ==================== EXECUTIVE SUMMARY ====================
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
  
  // Description text
  description: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  
  // ==================== VIDEO ANALYSIS SECTION ====================
  videoAnalysisContainer: {
    marginBottom: 20,
  },
  videoFileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    marginBottom: 10,
  },
  videoFileName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  videoLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
  },
  videoStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  videoStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  videoStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  videoStatLabel: {
    fontSize: 8,
    color: '#666666',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  chartContainer: {
    marginBottom: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  chartTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  timelineBar: {
    height: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineSegment: {
    height: '100%',
  },
  timelineAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineAxisLabel: {
    fontSize: 8,
    color: '#6b7280',
  },
  noVideoMessage: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    padding: 20,
  },
});

// Helper to get severity badge style
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

// Helper to get border color for finding
const getSeverityBorderColor = (severity) => {
  switch (severity?.toUpperCase()) {
    case 'HIGH':
      return '#dc2626';
    case 'MEDIUM':
      return '#ea580c';
    case 'LOW':
      return '#16a34a';
    default:
      return '#6b7280';
  }
};

// ==================== PAGE COMPONENTS ====================

// Professional Header (excludes cover page)
const PageHeader = ({ data }) => (
  <View style={styles.header}>
    <Text style={styles.headerLeft}>{data.applicationName}</Text>
    <Text style={styles.headerRight}>Report ID: {data.reportId}</Text>
  </View>
);

// Professional Footer
const PageFooter = ({ data, pageNumber }) => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerLeft}>Confidential – Internal Audit Report</Text>
    <Text style={styles.footerRight}>Page {pageNumber}</Text>
  </View>
);

// Cover Page
const CoverPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.coverPage}>
      <Text style={styles.coverTitle}>SYSTEM ANALYSIS AUDIT REPORT</Text>
      <Text style={styles.coverSubtitle}>Automated Security and Integrity Analysis</Text>
      <Text style={styles.confidentialityLabel}>CONFIDENTIAL – INTERNAL USE ONLY</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverInfo}>
        Generated: {data.generatedDate}{'\n'}
        Report ID: {data.reportId}{'\n'}
        Application: {data.applicationName}{'\n'}
        Version: {data.version || '1.0.0'}
      </Text>
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerLeft}>Confidential – Internal Audit Report</Text>
      <Text style={styles.footerRight}>Page 1</Text>
    </View>
  </Page>
);

// Table of Contents Page
const TableOfContentsPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <PageHeader data={data} />
    <Text style={styles.sectionTitle}>Table of Contents</Text>
    <View style={styles.tocContainer}>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>1. Executive Summary</Text>
        <Text style={styles.tocPage}>3</Text>
      </View>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>2. Risk Overview</Text>
        <Text style={styles.tocPage}>4</Text>
      </View>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>3. Findings Summary</Text>
        <Text style={styles.tocPage}>5</Text>
      </View>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>4. Detailed Findings</Text>
        <Text style={styles.tocPage}>6</Text>
      </View>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>5. Recommendations</Text>
        <Text style={styles.tocPage}>{6 + Math.ceil((data.findings?.length || 0) / 2)}</Text>
      </View>
      <View style={styles.tocEntry}>
        <Text style={styles.tocText}>6. Methodology</Text>
        <Text style={styles.tocPage}>{7 + Math.ceil((data.findings?.length || 0) / 2)}</Text>
      </View>
    </View>
    <PageFooter data={data} pageNumber={2} />
  </Page>
);

// Executive Summary Page
const ExecutiveSummaryPage = ({ data }) => {
  const { highCount = 0, mediumCount = 0, lowCount = 0, riskScore = 0 } = data;
  const total = highCount + mediumCount + lowCount;

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader data={data} />
      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <Text style={styles.description}>
        This report presents the findings from the automated media integrity analysis performed by {data.applicationName}. 
        The analysis evaluates media files for potential manipulation indicators and provides detailed findings with recommendations.
      </Text>

      {/* Risk Score Display */}
      <Text style={styles.subsectionTitle}>Overall Risk Assessment</Text>
      <View style={styles.riskScoreContainer}>
        <View style={styles.riskScoreBox}>
          <Text style={[styles.riskScoreValue, { color: riskScore > 70 ? '#dc2626' : riskScore > 40 ? '#ea580c' : '#16a34a' }]}>
            {riskScore}
          </Text>
          <Text style={styles.riskScoreLabel}>Risk Score / 100</Text>
        </View>
      </View>

      {/* Severity Summary Cards */}
      <Text style={styles.subsectionTitle}>Severity Distribution</Text>
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
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: '#16a34a' }]}>{lowCount}</Text>
          <Text style={styles.statLabel}>Low Severity</Text>
        </View>
      </View>

      {/* Summary Table */}
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

      <PageFooter data={data} pageNumber={3} />
    </Page>
  );
};

// Risk Overview Page
const RiskOverviewPage = ({ data }) => {
  const { highCount = 0, mediumCount = 0, lowCount = 0, riskScore = 0 } = data;
  
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader data={data} />
      <Text style={styles.sectionTitle}>Risk Overview</Text>
      
      <Text style={styles.bodyText}>
        This section provides a comprehensive overview of the risk landscape identified during the audit. 
        The risk score is calculated based on the severity of findings, with higher scores indicating greater potential impact.
      </Text>

      {/* Risk Score Display */}
      <View style={styles.riskScoreContainer}>
        <View style={styles.riskScoreBox}>
          <Text style={[styles.riskScoreValue, { color: riskScore > 70 ? '#dc2626' : riskScore > 40 ? '#ea580c' : '#16a34a' }]}>
            {riskScore}
          </Text>
          <Text style={styles.riskScoreLabel}>Overall Risk Score</Text>
        </View>
      </View>

      {/* Risk Level Description */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Risk Level</Text>
          <Text style={[styles.summaryValue, { color: riskScore > 70 ? '#dc2626' : riskScore > 40 ? '#ea580c' : '#16a34a' }]}>
            {riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW'}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>High Risk Issues</Text>
          <Text style={[styles.summaryValue, { color: '#dc2626' }]}>{highCount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Medium Risk Issues</Text>
          <Text style={[styles.summaryValue, { color: '#ea580c' }]}>{mediumCount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Low Risk Issues</Text>
          <Text style={[styles.summaryValue, { color: '#16a34a' }]}>{lowCount}</Text>
        </View>
      </View>

      <PageFooter data={data} pageNumber={4} />
    </Page>
  );
};

// Findings Summary Table Page
const FindingsSummaryPage = ({ data }) => (
  <Page size="A4" style={styles.page}>
    <PageHeader data={data} />
    <Text style={styles.sectionTitle}>Findings Summary</Text>
    
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.tableCellId]}>ID</Text>
        <Text style={[styles.tableHeaderCell, styles.tableCellTitle]}>Title</Text>
        <Text style={[styles.tableHeaderCell, styles.tableCellSeverity]}>Severity</Text>
        <Text style={[styles.tableHeaderCell, styles.tableCellCategory]}>Category</Text>
        <Text style={[styles.tableHeaderCell, styles.tableCellStatus]}>Status</Text>
      </View>
      
      {data.findings && data.findings.length > 0 ? (
        data.findings.map((finding, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellId]}>{finding.id}</Text>
            <Text style={[styles.tableCell, styles.tableCellTitle]}>{finding.title.substring(0, 40)}</Text>
            <Text style={[styles.tableCell, styles.tableCellSeverity]}>
              <Text style={getSeverityStyle(finding.severity)}>{finding.severity}</Text>
            </Text>
            <Text style={[styles.tableCell, styles.tableCellCategory]}>{finding.category}</Text>
            <Text style={[styles.tableCell, styles.tableCellStatus]}>{finding.status || 'Open'}</Text>
          </View>
        ))
      ) : (
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '100%', textAlign: 'center' }]}>No findings to report</Text>
        </View>
      )}
    </View>

    <PageFooter data={data} pageNumber={5} />
  </Page>
);

// Detailed Findings Page
const FindingsPage = ({ data, startPage }) => (
  <Page size="A4" style={styles.page} wrap>
    <PageHeader data={data} />
    <Text style={styles.sectionTitle}>Detailed Findings</Text>
    
    {data.findings && data.findings.length > 0 ? (
      data.findings.map((finding, index) => (
        <View 
          key={index} 
          style={[
            styles.finding, 
            { borderLeftColor: getSeverityBorderColor(finding.severity) }
          ]}
        >
          {/* Finding Header with ID and Severity Badge */}
          <View style={styles.findingHeader}>
            <Text style={styles.findingId}>Finding ID: {finding.id}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.categoryTag}>{finding.category}</Text>
              <Text style={[styles.severityBadge, getSeverityStyle(finding.severity)]}>
                {finding.severity}
              </Text>
            </View>
          </View>
          
          <Text style={styles.findingTitle}>{finding.title}</Text>
          
          {/* Description */}
          <Text style={styles.findingLabel}>Description:</Text>
          <Text style={styles.findingText}>{finding.description}</Text>
          
          {/* Impact Section */}
          <Text style={styles.findingLabel}>Impact:</Text>
          <Text style={styles.findingText}>{finding.impact}</Text>
          
          <View style={styles.findingDivider} />
          
          {/* Recommendation */}
          <View style={styles.recommendationBox}>
            <Text style={styles.recommendationTitle}>Recommendation:</Text>
            <Text style={styles.recommendationText}>{finding.recommendation}</Text>
          </View>
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

    <PageFooter data={data} pageNumber={startPage} />
  </Page>
);

// Recommendations Page
const RecommendationsPage = ({ data }) => {
  const highFindings = data.findings?.filter(f => f.severity === 'HIGH') || [];
  const mediumFindings = data.findings?.filter(f => f.severity === 'MEDIUM') || [];
  const lowFindings = data.findings?.filter(f => f.severity === 'LOW') || [];
  
  const startPage = 6 + Math.ceil((data.findings?.length || 0) / 2);

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader data={data} />
      <Text style={styles.sectionTitle}>Priority Recommendations</Text>
      
      <Text style={styles.bodyText}>
        The following recommendations are prioritized based on the severity of findings. 
        Immediate attention should be given to critical fixes, followed by important improvements and optional enhancements.
      </Text>

      {/* Critical Fixes */}
      {highFindings.length > 0 && (
        <View style={[styles.prioritySection, styles.priorityCritical]}>
          <Text style={[styles.priorityTitle, styles.priorityCriticalTitle]}>Critical Fixes</Text>
          {highFindings.map((finding, index) => (
            <Text key={index} style={styles.priorityItem}>• {finding.title}</Text>
          ))}
        </View>
      )}

      {/* Important Improvements */}
      {mediumFindings.length > 0 && (
        <View style={[styles.prioritySection, styles.priorityImportant]}>
          <Text style={[styles.priorityTitle, styles.priorityImportantTitle]}>Important Improvements</Text>
          {mediumFindings.map((finding, index) => (
            <Text key={index} style={styles.priorityItem}>• {finding.title}</Text>
          ))}
        </View>
      )}

      {/* Optional Enhancements */}
      {lowFindings.length > 0 && (
        <View style={[styles.prioritySection, styles.priorityOptional]}>
          <Text style={[styles.priorityTitle, styles.priorityOptionalTitle]}>Optional Enhancements</Text>
          {lowFindings.map((finding, index) => (
            <Text key={index} style={styles.priorityItem}>• {finding.title}</Text>
          ))}
        </View>
      )}

      <PageFooter data={data} pageNumber={startPage} />
    </Page>
  );
};

// Methodology Page
const MethodologyPage = ({ data }) => {
  const startPage = 7 + Math.ceil((data.findings?.length || 0) / 2);
  
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader data={data} />
      <Text style={styles.sectionTitle}>Methodology</Text>
      
      <View style={styles.methodologyContainer}>
        <Text style={styles.methodologyTitle}>Report Generation Methodology</Text>
        <Text style={styles.methodologyText}>
          This report was generated using automated analysis and rule-based evaluation techniques to identify potential system issues and risks. 
          The analysis employs advanced machine learning models to detect media manipulation indicators, providing confidence scores and categorization of findings.
        </Text>
        <Text style={styles.methodologyText}>
          {'\n'}The risk scoring methodology assigns weighted values to findings based on their severity: HIGH severity findings receive 10 points, 
          MEDIUM severity findings receive 5 points, and LOW severity findings receive 2 points. The overall risk score is capped at 100.
        </Text>
        <Text style={styles.methodologyText}>
          {'\n'}Categories assigned to findings include Security (potential security vulnerabilities), Data Integrity (concerns about data authenticity), 
          and Compliance (regulatory and standards adherence).
        </Text>
        <Text style={styles.methodologyText}>
          {'\n'}This audit report is automatically generated and should be reviewed by qualified personnel for final assessment and action planning.
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.bodyText}>
          <Text style={{ fontWeight: 'bold' }}>Report Information:</Text>{'\n'}
          Report ID: {data.reportId}{'\n'}
          Generated: {data.generatedDate}{'\n'}
          Application: {data.applicationName}{'\n'}
          Version: {data.version || '1.0.0'}
        </Text>
      </View>

      <PageFooter data={data} pageNumber={startPage} />
    </Page>
  );
};

// ==================== MAIN PDF DOCUMENT ====================

const AuditReportPDF = ({ data }) => {
  const findingsCount = data.findings?.length || 0;
  const findingsPages = Math.ceil(findingsCount / 2);
  
  return (
    <Document>
      <CoverPage data={data} />
      <TableOfContentsPage data={data} />
      <ExecutiveSummaryPage data={data} />
      <RiskOverviewPage data={data} />
      <FindingsSummaryPage data={data} />
      <FindingsPage data={data} startPage={6} />
      <RecommendationsPage data={data} />
      <MethodologyPage data={data} />
    </Document>
  );
};

export default AuditReportPDF;

