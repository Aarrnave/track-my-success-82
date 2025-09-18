import { useState } from "react";
import { Calendar, Clock, Plus, User, AlertTriangle, CheckCircle, Video, MessageSquare, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface Session {
  id: number;
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  duration: number;
  type: "Individual" | "Group";
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress";
  riskLevel: "High" | "Medium" | "Low";
  notes?: string;
  topics: string[];
}

const mockSessions: Session[] = [
  {
    id: 1,
    studentName: "Priya Sharma",
    studentId: "CSE21001",
    date: "2024-03-20",
    time: "10:00",
    duration: 45,
    type: "Individual",
    status: "Scheduled",
    riskLevel: "High",
    topics: ["Academic Performance", "Attendance Issues"]
  },
  {
    id: 2,
    studentName: "Rahul Kumar",
    studentId: "ECE21045", 
    date: "2024-03-20",
    time: "14:30",
    duration: 30,
    type: "Individual",
    status: "Completed",
    riskLevel: "Medium",
    notes: "Student showed improvement in attendance. Discussed study strategies.",
    topics: ["Study Techniques", "Time Management"]
  },
  {
    id: 3,
    studentName: "Group Session - Year 2 CSE",
    studentId: "GROUP_001",
    date: "2024-03-21",
    time: "11:00",
    duration: 60,
    type: "Group",
    status: "Scheduled",
    riskLevel: "Medium",
    topics: ["Career Guidance", "Stress Management"]
  },
  {
    id: 4,
    studentName: "Anjali Singh",
    studentId: "IT21023",
    date: "2024-03-21",
    time: "15:00",
    duration: 45,
    type: "Individual",
    status: "In Progress",
    riskLevel: "High",
    topics: ["Fee Payment Issues", "Family Support"]
  }
];

function getRiskColor(level: string) {
  switch(level) {
    case "High": return "destructive";
    case "Medium": return "default"; 
    case "Low": return "secondary";
    default: return "secondary";
  }
}

function getStatusColor(status: string) {
  switch(status) {
    case "Scheduled": return "default";
    case "Completed": return "secondary";
    case "Cancelled": return "destructive";
    case "In Progress": return "default";
    default: return "secondary";
  }
}

export default function CounselingSessions() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search functionality
  const filteredSessions = sessions.filter(session => {
    const matchesDate = session.date === selectedDate;
    const matchesSearch = searchTerm === "" || 
      session.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (session.notes && session.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDate && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Scheduled": return "default";
      case "Completed": return "secondary";
      case "Cancelled": return "destructive";
      case "In Progress": return "default";
      default: return "secondary";
    }
  };

  const getRiskColor = (level: string) => {
    switch(level) {
      case "High": return "destructive";
      case "Medium": return "default"; 
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const handleScheduleSession = (formData: any) => {
    const newSession: Session = {
      id: sessions.length + 1,
      studentName: formData.studentName,
      studentId: formData.studentId,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      type: formData.type,
      status: "Scheduled",
      riskLevel: formData.riskLevel,
      topics: formData.topics.split(',').map((t: string) => t.trim())
    };

    // Check for duplicate scheduling
    const existingSession = sessions.find(s => 
      s.studentId === formData.studentId && 
      s.date === formData.date && 
      s.status === "Scheduled"
    );

    if (existingSession) {
      toast.error("This student already has a scheduled session on this date!");
      return;
    }

    setSessions([...sessions, newSession]);
    setIsDialogOpen(false);
    toast.success("Session scheduled successfully! Student will be notified.");
  };

  const todaySessions = sessions.filter(session => session.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Counseling Sessions
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Schedule and manage counseling sessions with students
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
              <DialogDescription>
                Create a new counseling session with a student or group
              </DialogDescription>
            </DialogHeader>
            <ScheduleSessionForm onSubmit={handleScheduleSession} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Today's Sessions Alert */}
      {todaySessions.length > 0 && (
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertTitle>Today's Schedule</AlertTitle>
          <AlertDescription>
            You have {todaySessions.length} session(s) scheduled for today. 
            Next session starts at {todaySessions[0]?.time}.
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Date Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by student name, ID, topics, or notes..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="date-filter" className="text-sm font-medium">
            Filter by date:
          </Label>
          <Input
            id="date-filter"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              onStatusChange={(id, status) => {
                setSessions(prev => prev.map(s => 
                  s.id === id ? { ...s, status } : s
                ));
                toast.success(`Session ${status.toLowerCase()} successfully!`);
              }}
            />
          ))
        ) : (
          <div className="chart-container">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Sessions Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No sessions match your search criteria" : `No counseling sessions found for ${selectedDate}`}
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Schedule Your First Session
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Overview with Date Cards */}
      <WeeklyOverview sessions={sessions} />
    </div>
  );
}

function SessionCard({ session, onStatusChange }: { 
  session: Session; 
  onStatusChange: (id: number, status: Session['status']) => void;
}) {
  return (
    <div className="chart-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            {session.type === "Group" ? (
              <User className="h-6 w-6 text-primary" />
            ) : (
              <MessageSquare className="h-6 w-6 text-primary" />
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold">{session.studentName}</h3>
              <Badge variant={session.type === "Group" ? "default" : "outline"}>
                {session.type}
              </Badge>
              <Badge variant={getRiskColor(session.riskLevel)}>
                {session.riskLevel} Risk
              </Badge>
            </div>
            
            {session.studentId !== "GROUP_001" && (
              <p className="text-sm text-muted-foreground">
                Student ID: {session.studentId}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {session.time} • {session.duration} minutes
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {session.topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
            
            {session.notes && (
              <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                {session.notes}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end gap-3">
          <Badge variant={getStatusColor(session.status)} className="w-fit">
            {session.status}
          </Badge>
          
          <div className="flex gap-2">
            {session.status === "Scheduled" && (
              <>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStatusChange(session.id, "In Progress")}
                  className="gap-1"
                >
                  <Video className="h-3 w-3" />
                  Start
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onStatusChange(session.id, "Cancelled")}
                >
                  Cancel
                </Button>
              </>
            )}
            
            {session.status === "In Progress" && (
              <Button 
                size="sm" 
                variant="default"
                onClick={() => onStatusChange(session.id, "Completed")}
                className="gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleSessionForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    date: "",
    time: "",
    duration: "45",
    type: "Individual",
    riskLevel: "Medium",
    topics: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      studentName: "",
      studentId: "",
      date: "",
      time: "",
      duration: "45",
      type: "Individual", 
      riskLevel: "Medium",
      topics: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="student-name">Student/Group Name</Label>
        <Input
          id="student-name"
          value={formData.studentName}
          onChange={(e) => setFormData({...formData, studentName: e.target.value})}
          placeholder="Enter student name or group name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="student-id">Student ID</Label>
        <Input
          id="student-id"
          value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})}
          placeholder="Enter student ID or group ID"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Session Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="risk-level">Risk Level</Label>
        <Select value={formData.riskLevel} onValueChange={(value) => setFormData({...formData, riskLevel: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topics">Topics (comma separated)</Label>
        <Textarea
          id="topics"
          value={formData.topics}
          onChange={(e) => setFormData({...formData, topics: e.target.value})}
          placeholder="Academic Performance, Attendance Issues, Career Guidance"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit">
          Schedule Session
        </Button>
      </div>
    </form>
  );
}

function WeeklyOverview({ sessions }: { sessions: Session[] }) {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  
  const weekDays = Array.from({length: 7}, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">This Week's Overview</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {weekDays.map((date, index) => {
          const daySessions = sessions.filter(s => s.date === date);
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const dayNumber = new Date(date).getDate();
          
          return (
            <div key={date} className="date-card">
              <div className="text-center mb-2">
                <div className="text-sm font-medium">{dayName}</div>
                <div className="text-lg font-bold">{dayNumber}</div>
              </div>
              
              <div className="space-y-1">
                {daySessions.length > 0 ? (
                  daySessions.slice(0, 2).map((session) => (
                    <div key={session.id} className="text-xs p-1 bg-primary/10 rounded text-center">
                      {session.time}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground text-center">
                    No sessions
                  </div>
                )}
                
                {daySessions.length > 2 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{daySessions.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}