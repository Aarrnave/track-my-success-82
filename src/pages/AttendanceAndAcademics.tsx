import { useState } from "react";
import { Download, Filter, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AttendanceChart } from "@/components/charts/AttendanceChart";
import { AcademicChart } from "@/components/charts/AcademicChart";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const studentsData = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "CS21001",
    overallAttendance: 72,
    subjects: [
      { name: "Mathematics", attendance: 85, status: "good" },
      { name: "Physics", attendance: 65, status: "warning" },
      { name: "Chemistry", attendance: 78, status: "good" },
    ],
    gpa: 8.2,
    trend: "up"
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "CS21002",
    overallAttendance: 68,
    subjects: [
      { name: "Mathematics", attendance: 72, status: "warning" },
      { name: "Physics", attendance: 60, status: "danger" },
      { name: "Chemistry", attendance: 75, status: "good" },
    ],
    gpa: 7.1,
    trend: "down"
  },
];

export default function AttendanceAndAcademics() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("month");

  const exportToPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
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
    
    pdf.save('attendance-report.pdf');
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return { status: "good", color: "success" };
    if (percentage >= 65) return { status: "warning", color: "warning" };
    return { status: "danger", color: "destructive" };
  };

  return (
    <div className="space-y-6" id="report-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance & Academics</h1>
          <p className="text-muted-foreground">Monitor student attendance and academic performance</p>
        </div>
        <Button onClick={exportToPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                {studentsData.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" placeholder="From Date" />
          </div>
        </CardContent>
      </Card>

      {/* Alert for Low Attendance */}
      <Alert className="border-warning bg-warning/10">
        <AlertCircle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-warning-foreground">
          2 students have attendance below 75%. Immediate attention required.
        </AlertDescription>
      </Alert>

      {/* Charts Section */}
      <div className="space-y-6">
        <AttendanceChart />
        <AcademicChart />
      </div>

      {/* Student Details */}
      <Card>
        <CardHeader>
          <CardTitle>Student Performance Overview</CardTitle>
          <CardDescription>Individual student attendance and academic records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {studentsData.map((student) => {
              const attendanceStatus = getAttendanceStatus(student.overallAttendance);
              
              return (
                <div key={student.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">Roll No: {student.rollNo}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={attendanceStatus.color as any}>
                          {student.overallAttendance}% Attendance
                        </Badge>
                        <div className="flex items-center gap-1">
                          {student.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-sm font-medium">GPA: {student.gpa}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject-wise attendance */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {student.subjects.map((subject, index) => {
                      const subjectStatus = getAttendanceStatus(subject.attendance);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <span className="font-medium">{subject.name}</span>
                          <Badge variant={subjectStatus.color as any}>
                            {subject.attendance}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendations */}
                  {student.overallAttendance < 75 && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                      <h4 className="font-medium text-destructive mb-2">Recommendations:</h4>
                      <ul className="text-sm text-destructive space-y-1 list-disc list-inside">
                        <li>Schedule immediate counseling session</li>
                        <li>Contact parents/guardians</li>
                        <li>Implement attendance improvement plan</li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}