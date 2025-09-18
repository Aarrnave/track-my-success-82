import { useState } from "react";
import { AlertTriangle, TrendingDown, TrendingUp, Eye, ChevronDown, ChevronUp, Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from "sonner";
import { downloadCSV, downloadPDF } from "@/lib/download-utils";

const riskData = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "CS21001",
    riskLevel: "high",
    riskScore: 85,
    factors: {
      attendance: 65,
      academicPerformance: 68,
      feePayment: 40,
      engagement: 55
    },
    reasons: [
      "Attendance below 70% threshold",
      "Declining academic performance in last 2 semesters",
      "Outstanding fee payment overdue by 3 months",
      "Low participation in extracurricular activities"
    ],
    suggestions: [
      "Immediate counseling session required",
      "Contact parents regarding fee payment",
      "Academic support program enrollment",
      "Mentor assignment for regular check-ins"
    ],
    trend: [
      { month: "Jan", risk: 45 },
      { month: "Feb", risk: 52 },
      { month: "Mar", risk: 61 },
      { month: "Apr", risk: 73 },
      { month: "May", risk: 85 }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "CS21002", 
    riskLevel: "medium",
    riskScore: 62,
    factors: {
      attendance: 78,
      academicPerformance: 72,
      feePayment: 90,
      engagement: 65
    },
    reasons: [
      "Attendance showing declining trend",
      "Grade point average below department average",
      "Limited participation in group activities"
    ],
    suggestions: [
      "Schedule counseling session within 2 weeks",
      "Peer tutoring program enrollment",
      "Encourage participation in student activities"
    ],
    trend: [
      { month: "Jan", risk: 45 },
      { month: "Feb", risk: 48 },
      { month: "Mar", risk: 55 },
      { month: "Apr", risk: 58 },
      { month: "May", risk: 62 }
    ]
  },
  {
    id: 3,
    name: "Carol Davis",
    rollNo: "CS21003",
    riskLevel: "low",
    riskScore: 25,
    factors: {
      attendance: 92,
      academicPerformance: 88,
      feePayment: 100,
      engagement: 85
    },
    reasons: [
      "All performance indicators within normal range",
      "Consistent academic excellence",
      "Active participation in college activities"
    ],
    suggestions: [
      "Continue current academic approach",
      "Consider peer mentoring opportunities",
      "Leadership development programs"
    ],
    trend: [
      { month: "Jan", risk: 30 },
      { month: "Feb", risk: 28 },
      { month: "Mar", risk: 26 },
      { month: "Apr", risk: 24 },
      { month: "May", risk: 25 }
    ]
  }
];

const overallTrends = [
  { month: "Jan", high: 12, medium: 28, low: 85 },
  { month: "Feb", high: 15, medium: 32, low: 88 },
  { month: "Mar", high: 18, medium: 35, low: 82 },
  { month: "Apr", high: 22, medium: 38, low: 78 },
  { month: "May", high: 25, medium: 42, low: 75 }
];

export default function RiskPrediction() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const handleGenerateReport = async () => {
    try {
      const reportData = {
        title: "Student Risk Prediction Report",
        data: riskData.map(student => ({
          name: student.name,
          rollNo: student.rollNo,
          riskLevel: student.riskLevel,
          riskScore: student.riskScore,
          attendance: student.factors.attendance,
          academicPerformance: student.factors.academicPerformance,
          feePayment: student.factors.feePayment,
          engagement: student.factors.engagement
        })),
        reportType: "risk-analysis",
        filters: {
          branch: "all",
          dateRange: { from: "", to: "" }
        }
      };

      // Simulate generating report
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Trigger download
      downloadCSV(reportData);
      toast.success("Risk prediction report generated and downloaded!");
    } catch (error) {
      toast.error("Failed to generate risk report");
    }
  };

  const toggleExpanded = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-warning/10 border-warning/20";
      case "low": return "bg-success/10 border-success/20";
      default: return "bg-secondary/10 border-secondary/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk Prediction</h1>
          <p className="text-muted-foreground">AI-powered dropout risk analysis and intervention recommendations</p>
        </div>
        <Button onClick={handleGenerateReport} className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* High Risk Alert */}
      {riskData.filter(student => student.riskLevel === "high").length > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive-foreground">
            {riskData.filter(student => student.riskLevel === "high").length} student(s) identified with high dropout risk. Immediate intervention required.
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-destructive">
                  {riskData.filter(s => s.riskLevel === "high").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <div>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
                <p className="text-2xl font-bold text-warning">
                  {riskData.filter(s => s.riskLevel === "medium").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <div>
                <p className="text-sm text-muted-foreground">Low Risk</p>
                <p className="text-2xl font-bold text-success">
                  {riskData.filter(s => s.riskLevel === "low").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Level Trends</CardTitle>
          <CardDescription>Monthly distribution of risk levels across all students</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overallTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="high" stackId="a" fill="hsl(var(--destructive))" />
              <Bar dataKey="medium" stackId="a" fill="hsl(var(--warning))" />
              <Bar dataKey="low" stackId="a" fill="hsl(var(--success))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Student Risk Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Individual Risk Analysis</h2>
        
        {riskData
          .sort((a, b) => b.riskScore - a.riskScore)
          .map((student) => (
            <Card key={student.id} className={getRiskBgColor(student.riskLevel)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {student.name}
                      <Badge variant={getRiskColor(student.riskLevel) as any}>
                        {student.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </CardTitle>
                    <CardDescription>Roll No: {student.rollNo}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {student.riskScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Risk Factors */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Attendance</div>
                    <Progress value={student.factors.attendance} className="h-2" />
                    <div className="text-xs text-muted-foreground">{student.factors.attendance}%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Academic</div>
                    <Progress value={student.factors.academicPerformance} className="h-2" />
                    <div className="text-xs text-muted-foreground">{student.factors.academicPerformance}%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Fee Payment</div>
                    <Progress value={student.factors.feePayment} className="h-2" />
                    <div className="text-xs text-muted-foreground">{student.factors.feePayment}%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Engagement</div>
                    <Progress value={student.factors.engagement} className="h-2" />
                    <div className="text-xs text-muted-foreground">{student.factors.engagement}%</div>
                  </div>
                </div>

                {/* Risk Trend Chart */}
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={student.trend}>
                      <XAxis dataKey="month" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="risk" 
                        stroke={`hsl(var(--${getRiskColor(student.riskLevel)}))`}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Expandable Details */}
                <Collapsible 
                  open={expandedCards.includes(student.id)}
                  onOpenChange={() => toggleExpanded(student.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex items-center justify-between p-2">
                      <span className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Detailed Analysis
                      </span>
                      {expandedCards.includes(student.id) ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Risk Reasons */}
                      <div>
                        <h4 className="font-semibold mb-2 text-destructive">Risk Factors:</h4>
                        <ul className="space-y-1">
                          {student.reasons.map((reason, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-destructive">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Suggestions */}
                      <div>
                        <h4 className="font-semibold mb-2 text-success">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {student.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-success">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}