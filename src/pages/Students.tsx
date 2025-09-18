import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, MoreHorizontal, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const studentsData = [
  {
    id: 1,
    name: "Alice Johnson",
    rollNo: "CS21001",
    email: "alice.johnson@student.edu",
    year: "3rd Year",
    department: "Computer Science",
    section: "A",
    attendance: 72,
    gpa: 8.2,
    riskLevel: "high",
    lastActive: "2024-01-15",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 123-4567",
    guardian: "John Johnson",
    guardianPhone: "+1 (555) 123-4568"
  },
  {
    id: 2,
    name: "Bob Smith",
    rollNo: "EE21002",
    email: "bob.smith@student.edu",
    year: "2nd Year", 
    department: "Electronics",
    section: "B",
    attendance: 85,
    gpa: 7.1,
    riskLevel: "medium",
    lastActive: "2024-01-16",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 234-5678",
    guardian: "Mary Smith",
    guardianPhone: "+1 (555) 234-5679"
  },
  {
    id: 3,
    name: "Carol Davis",
    rollNo: "ME21003",
    email: "carol.davis@student.edu",
    year: "4th Year",
    department: "Mechanical",
    section: "A",
    attendance: 92,
    gpa: 8.8,
    riskLevel: "low",
    lastActive: "2024-01-16",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 345-6789",
    guardian: "Robert Davis",
    guardianPhone: "+1 (555) 345-6790"
  },
  {
    id: 4,
    name: "David Wilson",
    rollNo: "CE21004",
    email: "david.wilson@student.edu",
    year: "1st Year",
    department: "Civil",
    section: "C",
    attendance: 78,
    gpa: 7.5,
    riskLevel: "low",
    lastActive: "2024-01-15",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 456-7890",
    guardian: "Lisa Wilson",
    guardianPhone: "+1 (555) 456-7891"
  },
  {
    id: 5,
    name: "Eva Brown",
    rollNo: "CS21005",
    email: "eva.brown@student.edu",
    year: "3rd Year",
    department: "Computer Science",
    section: "B",
    attendance: 68,
    gpa: 6.9,
    riskLevel: "high",
    lastActive: "2024-01-14",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 567-8901",
    guardian: "Michael Brown",
    guardianPhone: "+1 (555) 567-8902"
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesYear = selectedYear === "all" || student.year === selectedYear;
    const matchesRisk = selectedRisk === "all" || student.riskLevel === selectedRisk;

    return matchesSearch && matchesDepartment && matchesYear && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return "text-success";
    if (attendance >= 75) return "text-warning";
    return "text-destructive";
  };

  const getGpaColor = (gpa: number) => {
    if (gpa >= 8.0) return "text-success";
    if (gpa >= 7.0) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage and monitor all student records</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">{studentsData.length}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{studentsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-destructive">
                  {studentsData.filter(s => s.riskLevel === "high").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Good Standing</p>
                <p className="text-2xl font-bold text-success">
                  {studentsData.filter(s => s.attendance >= 85 && s.gpa >= 7.5).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">
                  {Math.round(studentsData.reduce((acc, s) => acc + s.attendance, 0) / studentsData.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRisk} onValueChange={setSelectedRisk}>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {studentsData.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year/Section</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.year}</div>
                        <div className="text-sm text-muted-foreground">Section {student.section}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getGpaColor(student.gpa)}`}>
                        {student.gpa}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(student.riskLevel) as any}>
                        {student.riskLevel.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Schedule Counseling
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Contact Guardian
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}