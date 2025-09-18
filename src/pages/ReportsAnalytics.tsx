import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, Users, AlertTriangle, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { toast } from "sonner";
import { downloadCSV, downloadPDF, generateReportData } from "@/lib/download-utils";

const reportTypes = [
  { id: "attendance", name: "Attendance Report", description: "Detailed attendance analysis by student, branch, and time period" },
  { id: "academic", name: "Academic Performance", description: "Student grades, GPA trends, and subject-wise analysis" },
  { id: "counseling", name: "Counseling Sessions Report", description: "Session outcomes, student progress, and intervention effectiveness" },
  { id: "risk-analysis", name: "Risk Analysis Report", description: "Dropout risk predictions and intervention recommendations" },
  { id: "fee-dues", name: "Fee Dues Analysis", description: "Outstanding fees, payment trends, and financial aid insights" }
];

// Full year attendance data with year selector support
const generateAttendanceData = (year: string) => {
  const currentYear = new Date().getFullYear();
  const selectedYear = parseInt(year);
  
  // Base data for current year
  const baseData = [
    { month: "Jan", overall: 87, cse: 89, ece: 85, it: 88, mech: 86 },
    { month: "Feb", overall: 85, cse: 87, ece: 83, it: 86, mech: 84 },
    { month: "Mar", overall: 89, cse: 91, ece: 87, it: 90, mech: 88 },
    { month: "Apr", overall: 88, cse: 90, ece: 86, it: 89, mech: 87 },
    { month: "May", overall: 90, cse: 92, ece: 88, it: 91, mech: 89 },
    { month: "Jun", overall: 87, cse: 89, ece: 85, it: 88, mech: 86 },
    { month: "Jul", overall: 86, cse: 88, ece: 84, it: 87, mech: 85 },
    { month: "Aug", overall: 88, cse: 90, ece: 86, it: 89, mech: 87 },
    { month: "Sep", overall: 91, cse: 93, ece: 89, it: 92, mech: 90 },
    { month: "Oct", overall: 89, cse: 91, ece: 87, it: 90, mech: 88 },
    { month: "Nov", overall: 87, cse: 89, ece: 85, it: 88, mech: 86 },
    { month: "Dec", overall: 85, cse: 87, ece: 83, it: 86, mech: 84 }
  ];
  
  // If future year or no data year, show zeros
  if (selectedYear > currentYear) {
    return baseData.map(item => ({
      ...item,
      overall: 0,
      cse: 0,
      ece: 0,
      it: 0,
      mech: 0
    }));
  }
  
  // For past years, modify data slightly
  if (selectedYear < currentYear) {
    return baseData.map(item => ({
      ...item,
      overall: Math.max(0, item.overall - Math.floor(Math.random() * 10)),
      cse: Math.max(0, item.cse - Math.floor(Math.random() * 10)),
      ece: Math.max(0, item.ece - Math.floor(Math.random() * 10)),
      it: Math.max(0, item.it - Math.floor(Math.random() * 10)),
      mech: Math.max(0, item.mech - Math.floor(Math.random() * 10))
    }));
  }
  
  return baseData;
};

const mockRiskData = [
  { name: "Low Risk", value: 145, color: "#4ade80" },
  { name: "Medium Risk", value: 38, color: "#facc15" },
  { name: "High Risk", value: 15, color: "#f87171" }
];

const mockCounselingOutcomes = [
  { month: "Jan", successful: 85, partial: 12, ongoing: 8 },
  { month: "Feb", successful: 89, partial: 10, ongoing: 6 },
  { month: "Mar", successful: 92, partial: 8, ongoing: 4 },
  { month: "Apr", successful: 87, partial: 11, ongoing: 7 },
  { month: "May", successful: 94, partial: 6, ongoing: 3 },
  { month: "Jun", successful: 90, partial: 9, ongoing: 5 }
];

export default function ReportsAnalytics() {
  const [selectedReport, setSelectedReport] = useState("attendance");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      const filters = {
        branch: selectedBranch,
        dateRange,
        year: selectedYear
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Report generated successfully!");
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleDownloadReport = async (format: "pdf" | "csv") => {
    try {
      const filters = {
        branch: selectedBranch,
        dateRange,
        year: selectedYear
      };
      
      const reportData = generateReportData(selectedReport, filters);
      
      if (format === "csv") {
        downloadCSV(reportData);
        toast.success("CSV report downloaded successfully!");
      } else {
        await downloadPDF(reportData, "report-preview");
        toast.success("PDF report downloaded successfully!");
      }
    } catch (error) {
      toast.error(`Failed to download ${format.toUpperCase()} report`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Generate comprehensive reports and analyze student data trends
          </p>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Report Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Branch</Label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="cse">Computer Science</SelectItem>
                <SelectItem value="ece">Electronics</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="mech">Mechanical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>From Date</Label>
            <Input 
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>To Date</Label>
            <Input 
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button onClick={handleGenerateReport} disabled={isGeneratingReport} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            {isGeneratingReport ? "Generating..." : "Generate Report"}
          </Button>
          <Button variant="outline" onClick={() => handleDownloadReport("pdf")} className="gap-2 btn-white-hover">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => handleDownloadReport("csv")} className="gap-2 btn-white-hover">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      {/* Report Preview */}
      <div id="report-preview">
        <ReportPreview reportType={selectedReport} selectedYear={selectedYear} />
      </div>

      {/* Quick Stats */}
      <QuickStats />
    </div>
  );
}

function ReportPreview({ reportType, selectedYear }: { reportType: string; selectedYear: string }) {
  const renderReportContent = () => {
    switch(reportType) {
      case "attendance":
        return <AttendanceReport selectedYear={selectedYear} />;
      case "academic":
        return <AcademicReport />;
      case "counseling":
        return <CounselingReport />;
      case "risk-analysis":
        return <RiskAnalysisReport />;
      case "fee-dues":
        return <FeeDuesReport />;
      default:
        return <AttendanceReport selectedYear={selectedYear} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderReportContent()}
    </div>
  );
}

function AttendanceReport({ selectedYear }: { selectedYear: string }) {
  const [currentYear, setCurrentYear] = useState(selectedYear);
  const attendanceData = generateAttendanceData(currentYear);
  
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Attendance Analysis</h3>
        </div>
        <div className="flex items-center gap-2">
          <Label>Year:</Label>
          <Select value={currentYear} onValueChange={setCurrentYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Line type="monotone" dataKey="overall" stroke="hsl(var(--primary))" strokeWidth={3} name="Overall" />
          <Line type="monotone" dataKey="cse" stroke="hsl(var(--chart-2))" strokeWidth={2} name="CSE" />
          <Line type="monotone" dataKey="ece" stroke="hsl(var(--chart-3))" strokeWidth={2} name="ECE" />
          <Line type="monotone" dataKey="it" stroke="hsl(var(--chart-4))" strokeWidth={2} name="IT" />
          <Line type="monotone" dataKey="mech" stroke="hsl(var(--chart-5))" strokeWidth={2} name="MECH" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AcademicReport() {
  const academicData = [
    { subject: "Mathematics", avg: 78, pass: 85, fail: 15 },
    { subject: "Physics", avg: 82, pass: 92, fail: 8 },
    { subject: "Chemistry", avg: 75, pass: 78, fail: 22 },
    { subject: "Programming", avg: 88, pass: 95, fail: 5 },
    { subject: "English", avg: 84, pass: 90, fail: 10 }
  ];

  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-success" />
        <h3 className="text-lg font-semibold">Academic Performance Analysis</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={academicData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Average Score" />
          <Bar dataKey="pass" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Pass %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CounselingReport() {
  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Counseling Session Outcomes</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={mockCounselingOutcomes}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey="successful"
            stackId="1"
            stroke="hsl(var(--success))"
            fill="hsl(var(--success))"
            fillOpacity={0.6}
            name="Successful"
          />
          <Area
            type="monotone"
            dataKey="partial"
            stackId="1"
            stroke="hsl(var(--warning))"
            fill="hsl(var(--warning))"
            fillOpacity={0.6}
            name="Partial Success"
          />
          <Area
            type="monotone"
            dataKey="ongoing"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
            name="Ongoing"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function RiskAnalysisReport() {
  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h3 className="text-lg font-semibold">Student Risk Distribution</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
            <Pie
              data={mockRiskData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {mockRiskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Risk Factor Breakdown</h4>
          {mockRiskData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">{item.value}</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((item.value / 198) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeeDuesReport() {
  const feeData = [
    { month: "Jan", collected: 85, pending: 15, defaulted: 0 },
    { month: "Feb", collected: 78, pending: 20, defaulted: 2 },
    { month: "Mar", collected: 92, pending: 7, defaulted: 1 },
    { month: "Apr", collected: 88, pending: 10, defaulted: 2 },
    { month: "May", collected: 95, pending: 4, defaulted: 1 },
    { month: "Jun", collected: 89, pending: 9, defaulted: 2 }
  ];

  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold">Fee Collection Analysis</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={feeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey="collected"
            stackId="1"
            stroke="hsl(var(--success))"
            fill="hsl(var(--success))"
            fillOpacity={0.6}
            name="Collected %"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stackId="1"
            stroke="hsl(var(--warning))"
            fill="hsl(var(--warning))"
            fillOpacity={0.6}
            name="Pending %"
          />
          <Area
            type="monotone"
            dataKey="defaulted"
            stackId="1"
            stroke="hsl(var(--destructive))"
            fill="hsl(var(--destructive))"
            fillOpacity={0.6}
            name="Defaulted %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function QuickStats() {
  const stats = [
    { label: "Total Reports Generated", value: "247", change: "+15 this month" },
    { label: "Average Response Time", value: "2.3 hrs", change: "-0.5 hrs improved" },
    { label: "Data Accuracy", value: "99.2%", change: "+0.3% improved" },
    { label: "Report Downloads", value: "1,428", change: "+23 this week" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}