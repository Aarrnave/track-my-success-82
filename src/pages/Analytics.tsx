import { useState } from "react";
import { TrendingUp, Users, GraduationCap, Target, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';

// Sample data for analytics
const monthlyAttendance = [
  { month: "Jan", csAttendance: 85, eeAttendance: 82, meAttendance: 78, ceAttendance: 80 },
  { month: "Feb", csAttendance: 87, eeAttendance: 84, meAttendance: 80, ceAttendance: 82 },
  { month: "Mar", csAttendance: 86, eeAttendance: 86, meAttendance: 79, ceAttendance: 85 },
  { month: "Apr", csAttendance: 89, eeAttendance: 87, meAttendance: 81, ceAttendance: 87 },
  { month: "May", csAttendance: 88, eeAttendance: 85, meAttendance: 83, ceAttendance: 86 },
  { month: "Jun", csAttendance: 90, eeAttendance: 88, meAttendance: 85, ceAttendance: 89 }
];

const gpaDistribution = [
  { range: "9.0-10.0", count: 125, color: "hsl(var(--success))" },
  { range: "8.0-8.9", count: 342, color: "hsl(var(--success-light))" },
  { range: "7.0-7.9", count: 456, color: "hsl(var(--warning))" },
  { range: "6.0-6.9", count: 234, color: "hsl(var(--warning-light))" },
  { range: "Below 6.0", count: 90, color: "hsl(var(--destructive))" }
];

const departmentPerformance = [
  { department: "Computer Science", avgGpa: 8.2, avgAttendance: 88, totalStudents: 320 },
  { department: "Electronics", avgGpa: 7.8, avgAttendance: 85, totalStudents: 285 },
  { department: "Mechanical", avgGpa: 7.5, avgAttendance: 81, totalStudents: 298 },
  { department: "Civil", avgGpa: 7.9, avgAttendance: 86, totalStudents: 244 },
  { department: "Chemical", avgGpa: 8.0, avgAttendance: 84, totalStudents: 100 }
];

const riskFactorAnalysis = [
  { factor: "Attendance", lowRisk: 95, mediumRisk: 78, highRisk: 45 },
  { factor: "Academic Performance", lowRisk: 88, mediumRisk: 65, highRisk: 40 },
  { factor: "Fee Payment", lowRisk: 98, mediumRisk: 85, highRisk: 35 },
  { factor: "Engagement", lowRisk: 92, mediumRisk: 70, highRisk: 38 },
  { factor: "Family Support", lowRisk: 89, mediumRisk: 72, highRisk: 42 }
];

const semesterTrends = [
  { semester: "Fall 2022", retention: 94.5, graduation: 89.2, avgGpa: 7.6 },
  { semester: "Spring 2023", retention: 95.1, graduation: 90.1, avgGpa: 7.8 },
  { semester: "Fall 2023", retention: 95.8, graduation: 91.4, avgGpa: 7.9 },
  { semester: "Spring 2024", retention: 96.2, graduation: 92.1, avgGpa: 8.1 }
];

const correlationData = [
  { attendance: 95, gpa: 9.2, riskScore: 15 },
  { attendance: 88, gpa: 8.4, riskScore: 25 },
  { attendance: 75, gpa: 7.1, riskScore: 45 },
  { attendance: 68, gpa: 6.8, riskScore: 65 },
  { attendance: 55, gpa: 5.9, riskScore: 85 },
  { attendance: 82, gpa: 7.8, riskScore: 32 },
  { attendance: 91, gpa: 8.9, riskScore: 18 },
  { attendance: 77, gpa: 7.3, riskScore: 42 }
];

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-semester");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const exportReport = () => {
    // Simulate PDF export
    console.log("Exporting analytics report...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into student performance and trends</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Current Semester</SelectItem>
              <SelectItem value="academic-year">Academic Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student Retention</p>
                <p className="text-2xl font-bold">96.2%</p>
                <p className="text-xs text-success">+1.7% from last semester</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Graduation Rate</p>
                <p className="text-2xl font-bold">92.1%</p>
                <p className="text-xs text-success">+2.9% from last year</p>
              </div>
              <GraduationCap className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                <p className="text-2xl font-bold">8.1</p>
                <p className="text-xs text-success">+0.3 from last semester</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">At-Risk Students</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-destructive">-8 from last month</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance Analysis</TabsTrigger>
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Attendance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance by Department</CardTitle>
                <CardDescription>Attendance percentage trends across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="csAttendance" stroke="hsl(var(--primary))" strokeWidth={2} name="Computer Science" />
                    <Line type="monotone" dataKey="eeAttendance" stroke="hsl(var(--accent))" strokeWidth={2} name="Electronics" />
                    <Line type="monotone" dataKey="meAttendance" stroke="hsl(var(--success))" strokeWidth={2} name="Mechanical" />
                    <Line type="monotone" dataKey="ceAttendance" stroke="hsl(var(--warning))" strokeWidth={2} name="Civil" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Overview</CardTitle>
                <CardDescription>Current semester statistics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">{dept.totalStudents} students</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Attendance</span>
                            <span>{dept.avgAttendance}%</span>
                          </div>
                          <Progress value={dept.avgAttendance} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Avg GPA</span>
                            <span>{dept.avgGpa}</span>
                          </div>
                          <Progress value={dept.avgGpa * 10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>GPA Distribution</CardTitle>
                <CardDescription>Student distribution across GPA ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gpaDistribution} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="range" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Academic Performance Correlation */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance vs GPA Correlation</CardTitle>
                <CardDescription>Relationship between attendance and academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="attendance" name="Attendance %" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="gpa" name="GPA" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="gpa" fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Factor Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
                <CardDescription>Performance metrics by risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={riskFactorAnalysis}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="factor" className="text-muted-foreground" />
                    <PolarRadiusAxis domain={[0, 100]} className="text-muted-foreground" />
                    <Radar name="Low Risk" dataKey="lowRisk" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.2} />
                    <Radar name="Medium Risk" dataKey="mediumRisk" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.2} />
                    <Radar name="High Risk" dataKey="highRisk" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.2} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Current Risk Distribution</CardTitle>
                <CardDescription>Student count by risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="h-16 w-16 rounded-full bg-success/10 mx-auto flex items-center justify-center">
                        <span className="text-2xl font-bold text-success">1156</span>
                      </div>
                      <p className="text-sm font-medium">Low Risk</p>
                      <p className="text-xs text-muted-foreground">92.8%</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 w-16 rounded-full bg-warning/10 mx-auto flex items-center justify-center">
                        <span className="text-2xl font-bold text-warning">68</span>
                      </div>
                      <p className="text-sm font-medium">Medium Risk</p>
                      <p className="text-xs text-muted-foreground">5.5%</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 w-16 rounded-full bg-destructive/10 mx-auto flex items-center justify-center">
                        <span className="text-2xl font-bold text-destructive">23</span>
                      </div>
                      <p className="text-sm font-medium">High Risk</p>
                      <p className="text-xs text-muted-foreground">1.8%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Risk Mitigation Actions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>Active counseling sessions</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>Parent meetings scheduled</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>Academic support enrolled</span>
                        <span className="font-medium">35</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Performance Trends</CardTitle>
              <CardDescription>Semester-wise retention, graduation, and GPA trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={semesterTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="semester" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line type="monotone" dataKey="retention" stroke="hsl(var(--primary))" strokeWidth={3} name="Retention Rate %" />
                  <Line type="monotone" dataKey="graduation" stroke="hsl(var(--success))" strokeWidth={3} name="Graduation Rate %" />
                  <Line type="monotone" dataKey="avgGpa" stroke="hsl(var(--accent))" strokeWidth={3} name="Average GPA" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}