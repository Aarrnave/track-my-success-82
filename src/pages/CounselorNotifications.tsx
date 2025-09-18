import { useState } from "react";
import { Bell, X, AlertTriangle, Calendar, User, CheckCircle, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Notification {
  id: number;
  type: "alert" | "session" | "deadline" | "system" | "student";
  title: string;
  message: string;
  time: string;
  priority: "high" | "medium" | "low";
  isRead: boolean;
  studentName?: string;
  actionRequired?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "alert",
    title: "High-Risk Student Alert",
    message: "Priya Sharma (CSE21001) has been flagged as high-risk due to declining attendance and academic performance.",
    time: "2 hours ago",
    priority: "high",
    isRead: false,
    studentName: "Priya Sharma",
    actionRequired: true
  },
  {
    id: 2,
    type: "session",
    title: "Upcoming Session Reminder",
    message: "You have a counseling session with Rahul Kumar scheduled at 2:00 PM today.",
    time: "4 hours ago",
    priority: "medium",
    isRead: false,
    studentName: "Rahul Kumar",
    actionRequired: false
  },
  {
    id: 3,
    type: "deadline",
    title: "Report Submission Deadline",
    message: "Monthly counseling reports are due in 3 days. Please submit all pending reports.",
    time: "6 hours ago",
    priority: "medium",
    isRead: true,
    actionRequired: true
  },
  {
    id: 4,
    type: "student",
    title: "Session Request",
    message: "Anjali Singh has requested an urgent counseling session regarding academic stress.",
    time: "1 day ago",
    priority: "high",
    isRead: false,
    studentName: "Anjali Singh",
    actionRequired: true
  },
  {
    id: 5,
    type: "system",
    title: "System Update",
    message: "The student management system will undergo maintenance tomorrow from 2:00 AM to 4:00 AM.",
    time: "2 days ago",
    priority: "low",
    isRead: true,
    actionRequired: false
  },
  {
    id: 6,
    type: "alert",
    title: "Multiple Absences Detected",
    message: "5 students in CSE branch have been absent for more than 3 consecutive days.",
    time: "3 days ago",
    priority: "medium",
    isRead: false,
    actionRequired: true
  }
];

export default function CounselorNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success("Notification deleted");
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filterType === "all" || notification.type === filterType;
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "unread" && !notification.isRead) ||
      (filterStatus === "read" && notification.isRead);
    return typeMatch && statusMatch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "alert": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "session": return <Calendar className="h-5 w-5 text-primary" />;
      case "student": return <User className="h-5 w-5 text-accent" />;
      case "deadline": return <Clock className="h-5 w-5 text-warning" />;
      case "system": return <Bell className="h-5 w-5 text-muted-foreground" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string): "default" | "destructive" | "outline" | "secondary" => {
    switch(priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getTypeColor = (type: string): "default" | "destructive" | "outline" | "secondary" => {
    switch(type) {
      case "alert": return "destructive";
      case "session": return "default";
      case "student": return "default";
      case "deadline": return "default";
      case "system": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Stay updated with alerts, reminders, and system notifications
          </p>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="destructive">{unreadCount} unread</Badge>
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="session">Sessions</SelectItem>
              <SelectItem value="student">Student Requests</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onDelete={deleteNotification}
              onMarkAsRead={markAsRead}
              getTypeIcon={getTypeIcon}
              getPriorityColor={getPriorityColor}
              getTypeColor={getTypeColor}
            />
          ))
        ) : (
          <div className="chart-container">
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">
                {filterType !== "all" || filterStatus !== "all" 
                  ? "No notifications match your current filters"
                  : "You're all caught up! No new notifications."
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationCard({ 
  notification, 
  onDelete, 
  onMarkAsRead,
  getTypeIcon,
  getPriorityColor,
  getTypeColor
}: { 
  notification: Notification; 
  onDelete: (id: number) => void;
  onMarkAsRead: (id: number) => void;
  getTypeIcon: (type: string) => React.ReactNode;
  getPriorityColor: (priority: string) => "default" | "destructive" | "outline" | "secondary";
  getTypeColor: (type: string) => "default" | "destructive" | "outline" | "secondary";
}) {
  return (
    <div 
      className={`chart-container group hover:shadow-lg transition-all duration-200 ${
        !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
      }`}
      onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="p-2 bg-card rounded-lg border">
            {getTypeIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-semibold text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                {notification.title}
              </h3>
              <Badge variant={getTypeColor(notification.type)} className="text-xs">
                {notification.type}
              </Badge>
              <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                {notification.priority}
              </Badge>
              {notification.actionRequired && (
                <Badge variant="outline" className="text-xs border-primary text-primary">
                  Action Required
                </Badge>
              )}
            </div>
            
            <p className={`text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.message}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{notification.time}</span>
              {notification.studentName && (
                <span className="font-medium">Student: {notification.studentName}</span>
              )}
            </div>
            
            {notification.actionRequired && !notification.isRead && (
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Take Action
                </Button>
                {notification.type === "student" && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Schedule Session
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!notification.isRead && (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}