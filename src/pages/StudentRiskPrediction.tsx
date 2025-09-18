import { useState } from "react";
import { Search, AlertTriangle, TrendingUp, User, Calendar, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const riskFactorsData = [
  { factor: "Attendance", value: 65, fullMark: 100 },
  { factor: "Academic Performance", value: 45, fullMark: 100 },
  { factor: "Fee Payment", value: 80, fullMark: 100 },
  { factor: "Engagement", value: 30, fullMark: 100 },
  { factor: "Behavioral", value: 70, fullMark: 100 }
];

const attendanceTrend = [
  { week: "Week 1", attendance: 85 },
  { week: "Week 2", attendance: 78 },
  { week: "Week 3", attendance: 65 },
  { week: "Week 4", attendance: 60 },
  { week: "Week 5", attendance: 55 },
  { week: "Week 6", attendance: 45 },
];

const academicPerformance = [
  { subject: "Math", score: 45 },
  { subject: "Physics", score: 52 },
  { subject: "Chemistry", score: 38 },
  { subject: "English", score: 68 },
  { subject: "Programming", score: 72 },
];

const students = [
  { id: 1, name: "Priya Sharma", rollNo: "CSE21001", branch: "CSE", riskLevel: "High", riskScore: 85, lastSession: "2 days ago" },
  { id: 2, name: "Rahul Kumar", rollNo: "ECE21045", branch: "ECE", riskLevel: "Medium", riskScore: 65, lastSession: "1 week ago" },
  { id: 3, name: "Anjali Singh", rollNo: "IT21023", branch: "IT", riskLevel: "High", riskScore: 78, lastSession: "Never" },
  { id: 4, name: "Vikash Gupta", rollNo: "MECH21012", branch: "MECH", riskLevel: "Low", riskScore: 25, lastSession: "1 month ago" },
  { id: 5, name: "Sneha Patel", rollNo: "CSE21089", branch: "CSE", riskLevel: "High", riskScore: 92, lastSession: "Never" },
];

export default function StudentRiskPrediction() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === "all" || student.branch === filterBranch;
    const isAtRisk = student.riskLevel !== "Low"; // Only show risk students
    return matchesSearch && matchesBranch && isAtRisk;
  });

  const getRiskColor = (level: string) => {
    switch(level) {
      case "High": return "destructive";
      case "Medium": return "default"; 
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const handleRequestCounseling = (student: any) => {
    // Check if already scheduled
    if (student.lastSession === "Never" || student.riskLevel === "High") {
      // Redirect to counseling request page
      alert(`Scheduling counseling session for ${student.name}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
            Student Risk Prediction
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            AI-powered dropout risk analysis and intervention recommendations
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by name or roll number..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterBranch} onValueChange={setFilterBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="CSE">Computer Science</SelectItem>
            <SelectItem value="ECE">Electronics</SelectItem>
            <SelectItem value="IT">Information Technology</SelectItem>
            <SelectItem value="MECH">Mechanical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {/* Risk Students Horizontal Carousel */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-semibold">Students Overview - At Risk Students</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const container = document.querySelector('.carousel-container');
                  container?.scrollBy({ left: -320, behavior: 'smooth' });
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const container = document.querySelector('.carousel-container');
                  container?.scrollBy({ left: 320, behavior: 'smooth' });
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="carousel-container">
            {filteredStudents.map((student) => (
              <div 
                key={student.id} 
                className={`carousel-card themed-card p-4 ${
                  selectedStudent?.id === student.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                    <div className="branch-label mt-1">{student.branch}</div>
                  </div>
                  <Badge variant={getRiskColor(student.riskLevel)}>
                    {student.riskLevel} Risk
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Score</span>
                    <span className="font-medium">{student.riskScore}%</span>
                  </div>
                  <Progress value={student.riskScore} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Last session: {student.lastSession}
                    </span>
                    {(student.lastSession === "Never" || student.riskLevel === "High") && (
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestCounseling(student);
                        }}
                        className="gap-1"
                      >
                        <MessageSquare className="h-3 w-3" />
                        Request
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Student Details */}
        <div className="space-y-6">
          {selectedStudent ? (
            <>
              {/* Student Info */}
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                  <Badge variant={getRiskColor(selectedStudent.riskLevel)}>
                    {selectedStudent.riskLevel} Risk
                  </Badge>
                </div>
                
                {selectedStudent.riskLevel === "High" && (
                  <Alert className="mb-4 border-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High Risk Alert</AlertTitle>
                    <AlertDescription>
                      This student requires immediate attention. Multiple risk factors detected.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Roll Number:</span>
                    <p className="font-medium">{selectedStudent.rollNo}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Branch:</span>
                    <p className="font-medium">{selectedStudent.branch}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Risk Score:</span>
                    <p className="font-medium text-destructive">{selectedStudent.riskScore}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Session:</span>
                    <p className="font-medium">{selectedStudent.lastSession}</p>
                  </div>
                </div>
              </div>

              {/* Risk Factors Radar Chart */}
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold">Risk Factor Analysis</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={riskFactorsData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="factor" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Radar
                      name="Risk Level"
                      dataKey="value"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Attendance Trend */}
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-warning" />
                  <h3 className="text-lg font-semibold">Attendance Trend</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="week" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="hsl(var(--warning))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Academic Performance */}
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-chart-3" />
                  <h3 className="text-lg font-semibold">Academic Performance</h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={academicPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="subject" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="hsl(var(--chart-3))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Action Recommendations */}
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-success" />
                  <h3 className="text-lg font-semibold">Recommended Actions</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <h4 className="font-medium text-destructive mb-1">Immediate Intervention Required</h4>
                    <p className="text-sm text-muted-foreground">Schedule urgent counseling session within 24 hours</p>
                  </div>
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <h4 className="font-medium text-warning mb-1">Academic Support</h4>
                    <p className="text-sm text-muted-foreground">Recommend tutoring for Math, Physics, and Chemistry</p>
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-medium text-primary mb-1">Parent Communication</h4>
                    <p className="text-sm text-muted-foreground">Notify parents about attendance and academic concerns</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="chart-container">
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Student</h3>
                <p className="text-muted-foreground">
                  Choose a student from the carousel above to view detailed risk analysis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}