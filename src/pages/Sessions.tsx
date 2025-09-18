import { useState } from "react";
import { Calendar, Clock, Users, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const sessionsData = [
  {
    id: 1,
    day: "Monday",
    time: "9:00 AM - 10:00 AM",
    subject: "Individual Counseling",
    year: "3rd Year",
    branch: "Computer Science",
    section: "A",
    students: 25,
    status: "scheduled",
    room: "Room 201"
  },
  {
    id: 2,
    day: "Monday", 
    time: "4:30 PM - 5:00 PM",
    subject: "Group Counseling",
    year: "2nd Year",
    branch: "Electronics",
    section: "B",
    students: 30,
    status: "scheduled",
    room: "Room 105"
  },
  {
    id: 3,
    day: "Tuesday",
    time: "10:00 AM - 11:00 AM",
    subject: "Career Guidance",
    year: "4th Year",
    branch: "Computer Science",
    section: "A",
    students: 28,
    status: "completed",
    room: "Room 301"
  },
  {
    id: 4,
    day: "Tuesday",
    time: "4:30 PM - 5:00 PM",
    subject: "Academic Support",
    year: "1st Year",
    branch: "Mechanical",
    section: "C",
    students: 35,
    status: "scheduled",
    room: "Room 102"
  },
  {
    id: 5,
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    subject: "Personal Counseling",
    year: "3rd Year",
    branch: "Civil",
    section: "A",
    students: 22,
    status: "cancelled",
    room: "Room 204"
  },
  {
    id: 6,
    day: "Thursday",
    time: "4:30 PM - 5:00 PM", 
    subject: "Group Discussion",
    year: "2nd Year",
    branch: "Computer Science",
    section: "B",
    students: 32,
    status: "scheduled",
    room: "Room 106"
  },
  {
    id: 7,
    day: "Friday",
    time: "11:00 AM - 12:00 PM",
    subject: "Stress Management",
    year: "4th Year",
    branch: "Electronics",
    section: "A",
    students: 26,
    status: "completed",
    room: "Room 302"
  }
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Sessions() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");

  const filteredSessions = sessionsData.filter(session => {
    const dayMatch = selectedDay === "all" || session.day === selectedDay;
    const branchMatch = selectedBranch === "all" || session.branch === selectedBranch;
    return dayMatch && branchMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "scheduled": return "default";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Counseling Sessions</h1>
          <p className="text-muted-foreground">View and manage your counseling timetable</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule New Session
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Total Sessions: {filteredSessions.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const daySessions = filteredSessions.filter(session => session.day === day);
          
          return (
            <Card key={day} className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-center">
                  {day}
                </CardTitle>
                <CardDescription className="text-center">
                  {daySessions.length} session{daySessions.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {daySessions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No sessions scheduled
                    </div>
                  ) : (
                    daySessions.map((session) => (
                      <div
                        key={session.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">
                              {session.time}
                            </span>
                          </div>
                          <Badge variant={getStatusColor(session.status) as any}>
                            {getStatusText(session.status)}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold mb-2">{session.subject}</h4>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>
                              {session.year} {session.branch} - Section {session.section}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">{session.students} students</span>
                          </div>
                          <div>
                            <span className="font-medium">{session.room}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{sessionsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {sessionsData.filter(s => s.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">
                  {sessionsData.filter(s => s.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 text-destructive">⚠</span>
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">
                  {sessionsData.filter(s => s.status === "cancelled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}