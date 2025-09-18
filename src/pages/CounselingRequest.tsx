import { useState } from "react";
import { Clock, Send, Calendar, Users, CheckCircle, XCircle, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const existingSessions = [
  {
    id: 1,
    date: "2024-01-15",
    time: "4:30 PM - 5:00 PM",
    type: "Group Counseling",
    students: ["Alice Johnson", "Bob Smith", "Carol Davis"],
    status: "scheduled",
    notes: "Focus on stress management techniques"
  },
  {
    id: 2,
    date: "2024-01-17",
    time: "4:30 PM - 5:00 PM", 
    type: "Individual Session",
    students: ["David Wilson"],
    status: "completed",
    notes: "Career guidance discussion"
  },
  {
    id: 3,
    date: "2024-01-22",
    time: "4:30 PM - 5:00 PM",
    type: "Group Session",
    students: ["Eva Brown", "Frank Miller"],
    status: "pending",
    notes: "Academic performance support"
  }
];

const availableStudents = [
  { id: 1, name: "Alice Johnson", year: "3rd", branch: "CS", section: "A" },
  { id: 2, name: "Bob Smith", year: "2nd", branch: "EE", section: "B" },
  { id: 3, name: "Carol Davis", year: "4th", branch: "ME", section: "A" },
  { id: 4, name: "David Wilson", year: "1st", branch: "CE", section: "C" },
  { id: 5, name: "Eva Brown", year: "3rd", branch: "CS", section: "B" },
  { id: 6, name: "Frank Miller", year: "2nd", branch: "EE", section: "A" }
];

export default function CounselingRequest() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleScheduleSession = () => {
    if (!selectedDate || !selectedTime || !sessionType || selectedStudents.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Counseling session scheduled for ${selectedDate} at ${selectedTime}. Notifications sent to ${selectedStudents.length} student(s).`,
      });
      
      // Reset form
      setSelectedDate("");
      setSelectedTime("");
      setSessionType("");
      setSelectedStudents([]);
      setNotes("");
      setIsDialogOpen(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "scheduled": return "default";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  const toggleStudent = (studentName: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentName)
        ? prev.filter(name => name !== studentName)
        : [...prev, studentName]
    );
  };

  // Get available time slots (4:30 PM - 5:00 PM on weekdays)
  const timeSlots = [
    "4:30 PM - 5:00 PM"
  ];

  const sessionTypeOptions = [
    "Individual Counseling",
    "Group Counseling", 
    "Career Guidance",
    "Academic Support",
    "Stress Management",
    "Personal Development"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Counseling Requests</h1>
          <p className="text-muted-foreground">Schedule and manage counseling sessions</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule Counseling Session</DialogTitle>
              <DialogDescription>
                Set up a new counseling session and notify students
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="type">Session Type</Label>
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Select Students</Label>
                <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                  {availableStudents.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2 py-2">
                      <input
                        type="checkbox"
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.name)}
                        onChange={() => toggleStudent(student.name)}
                        className="rounded"
                      />
                      <label htmlFor={`student-${student.id}`} className="text-sm cursor-pointer">
                        {student.name} - {student.year} Year {student.branch} Section {student.section}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedStudents.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedStudents.length} student(s) selected
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Session Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any specific notes or topics to cover..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleSession}>
                  <Send className="h-4 w-4 mr-2" />
                  Schedule & Notify
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{existingSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {existingSessions.filter(s => s.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">
                  {existingSessions.filter(s => s.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {existingSessions.filter(s => s.status === "pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session List */}
      <Card>
        <CardHeader>
          <CardTitle>Counseling Sessions</CardTitle>
          <CardDescription>Manage your scheduled and completed counseling sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingSessions.map((session) => (
              <div
                key={session.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{session.type}</h3>
                      <Badge variant={getStatusColor(session.status) as any}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {session.students.length} student{session.students.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Students: </span>
                    <span className="text-sm text-muted-foreground">
                      {session.students.join(', ')}
                    </span>
                  </div>
                  {session.notes && (
                    <div>
                      <span className="text-sm font-medium">Notes: </span>
                      <span className="text-sm text-muted-foreground">{session.notes}</span>
                    </div>
                  )}
                </div>

                {session.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline">
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
          <CardDescription>Your designated counseling hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-semibold">Weekly Counseling Schedule</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Monday to Friday: 4:30 PM - 5:00 PM
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum 2 sessions per week as per faculty guidelines
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}