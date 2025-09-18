import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportData {
  title: string;
  data: any[];
  reportType: string;
  filters: {
    branch: string;
    dateRange: {
      from: string;
      to: string;
    };
  };
}

export const downloadCSV = (data: ExportData) => {
  const { title, data: reportData, filters } = data;
  
  // Create CSV header
  let csvContent = `"${title}"\n`;
  csvContent += `"Generated on: ${new Date().toLocaleString()}"\n`;
  csvContent += `"Branch: ${filters.branch === 'all' ? 'All Branches' : filters.branch}"\n`;
  csvContent += `"Date Range: ${filters.dateRange.from} to ${filters.dateRange.to}"\n\n`;
  
  if (reportData.length === 0) {
    csvContent += '"No data available for the selected criteria"';
  } else {
    // Extract headers from first object
    const headers = Object.keys(reportData[0]);
    csvContent += headers.map(header => `"${header}"`).join(',') + '\n';
    
    // Add data rows
    reportData.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value !== null && value !== undefined ? value : ''}"`;
      });
      csvContent += values.join(',') + '\n';
    });
  }
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadPDF = async (data: ExportData, elementId?: string) => {
  const { title } = data;
  
  try {
    if (elementId) {
      // Capture specific element
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    } else {
      // Generate simple text-based PDF
      const pdf = new jsPDF();
      pdf.setFontSize(20);
      pdf.text(title, 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 50);
      pdf.text('Report data exported successfully', 20, 70);
      pdf.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    }
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};

export const generateReportData = (reportType: string, filters: any) => {
  // Mock data generation based on report type
  const baseData = {
    title: '',
    data: [],
    reportType,
    filters
  };

  switch (reportType) {
    case 'attendance':
      baseData.title = 'Attendance Report';
      baseData.data = [
        { month: 'January', overall: 87, cse: 89, ece: 85, it: 88, mech: 86 },
        { month: 'February', overall: 85, cse: 87, ece: 83, it: 86, mech: 84 },
        { month: 'March', overall: 89, cse: 91, ece: 87, it: 90, mech: 88 },
        { month: 'April', overall: 88, cse: 90, ece: 86, it: 89, mech: 87 },
        { month: 'May', overall: 90, cse: 92, ece: 88, it: 91, mech: 89 },
        { month: 'June', overall: 87, cse: 89, ece: 85, it: 88, mech: 86 }
      ];
      break;
    case 'academic':
      baseData.title = 'Academic Performance Report';
      baseData.data = [
        { subject: 'Mathematics', average: 78, pass_rate: 85, fail_rate: 15 },
        { subject: 'Physics', average: 82, pass_rate: 92, fail_rate: 8 },
        { subject: 'Chemistry', average: 75, pass_rate: 78, fail_rate: 22 },
        { subject: 'Programming', average: 88, pass_rate: 95, fail_rate: 5 },
        { subject: 'English', average: 84, pass_rate: 90, fail_rate: 10 }
      ];
      break;
    case 'counseling':
      baseData.title = 'Counseling Sessions Report';
      baseData.data = [
        { month: 'January', successful: 85, partial: 12, ongoing: 8 },
        { month: 'February', successful: 89, partial: 10, ongoing: 6 },
        { month: 'March', successful: 92, partial: 8, ongoing: 4 },
        { month: 'April', successful: 87, partial: 11, ongoing: 7 },
        { month: 'May', successful: 94, partial: 6, ongoing: 3 },
        { month: 'June', successful: 90, partial: 9, ongoing: 5 }
      ];
      break;
    case 'risk-analysis':
      baseData.title = 'Risk Analysis Report';
      baseData.data = [
        { risk_level: 'Low Risk', count: 145, percentage: 73.2 },
        { risk_level: 'Medium Risk', count: 38, percentage: 19.2 },
        { risk_level: 'High Risk', count: 15, percentage: 7.6 }
      ];
      break;
    case 'fee-dues':
      baseData.title = 'Fee Dues Analysis Report';
      baseData.data = [
        { month: 'January', collected: 85, pending: 15, defaulted: 0 },
        { month: 'February', collected: 78, pending: 20, defaulted: 2 },
        { month: 'March', collected: 92, pending: 7, defaulted: 1 },
        { month: 'April', collected: 88, pending: 10, defaulted: 2 },
        { month: 'May', collected: 95, pending: 4, defaulted: 1 },
        { month: 'June', collected: 89, pending: 9, defaulted: 2 }
      ];
      break;
    default:
      baseData.title = 'General Report';
      baseData.data = [];
  }

  return baseData;
};