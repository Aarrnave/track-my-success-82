import { useState } from "react";
import { Bell, X, AlertTriangle, Calendar, Users, CheckCircle, Clock, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  type: "deadline" | "scheduling" | "at-risk" | "missed-counseling" | "system" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  studentName?: string;
  actionRequired: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    type: "at-risk",
    title: "High Risk Student Alert",
    message: "Alice Johnson has been identified as high-risk for dropout. Immediate intervention required.",
    timestamp: "2024-01-15T10:30:00",
    isRead: false,
    priority: "high",
    studentName: "Alice Johnson",
    actionRequired: true
  },
  {
    id: 2,
    type: "missed-counseling",
    title: "Missed Counseling Session",
    message: "Bob Smith missed his scheduled counseling session on Jan 14, 2024 at 4:30 PM.",
    timestamp: "2024-01-14T17:00:00",
    isRead: false,
    priority: "medium",
    studentName: "Bob Smith",
    actionRequired: true
  },
  {
    id: 3,
    type: "deadline",
    title: "Assignment Submission Deadline",
    message: "Student progress reports submission deadline is approaching in 3 days (Jan 18, 2024).",
    timestamp: "2024-01-15T09:00:00",
    isRead: true,
    priority: "medium",
    actionRequired: false
  },
  {
    id: 4,
    type: "scheduling",
    title: "New Counseling Session Requested",
    message: "Carol Davis has requested a counseling session for academic support.",
    timestamp: "2024-01-15T08:45:00",
    isRead: false,
    priority: "low",
    studentName: "Carol Davis",
    actionRequired: true
  },
  {
    id: 5,
    type: "achievement",
    title: "Student Achievement",
    message: "David Wilson achieved 95% attendance this month. Consider recognition.",
    timestamp: "2024-01-14T16:20:00",
    isRead: true,
    priority: "low",
    studentName: "David Wilson",
    actionRequired: false
  },
  {
    id: 6,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled system maintenance on Jan 16, 2024 from 2:00 AM to 4:00 AM.",
    timestamp: "2024-01-13T15:00:00",
    isRead: true,
    priority: "low",
    actionRequired: false
  },
  {
    id: 7,
    type: "at-risk",
    title: "Attendance Warning",
    message: "Eva Brown's attendance has dropped below 70%. Consider scheduling a meeting.",
    timestamp: "2024-01-13T11:30:00",
    isRead: false,
    priority: "medium",
    studentName: "Eva Brown",
    actionRequired: true
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed from your list."
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated."
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline": return Calendar;
      case "scheduling": return Clock;
      case "at-risk": return AlertTriangle;
      case "missed-counseling": return Users;
      case "achievement": return CheckCircle;
      case "system": return Bell;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deadline": return "warning";
      case "scheduling": return "default";
      case "at-risk": return "destructive";
      case "missed-counseling": return "warning";
      case "achievement": return "success";
      case "system": return "secondary";
      default: return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const typeMatch = filterType === "all" || notif.type === filterType;
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "unread" && !notif.isRead) ||
      (filterStatus === "read" && notif.isRead);
    return typeMatch && statusMatch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with important notifications and alerts</p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        )}
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="at-risk">At-Risk Alerts</SelectItem>
                <SelectItem value="deadline">Deadlines</SelectItem>
                <SelectItem value="scheduling">Scheduling</SelectItem>
                <SelectItem value="missed-counseling">Missed Counseling</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Total: {filteredNotifications.length}</span>
              <span>Unread: {filteredNotifications.filter(n => !n.isRead).length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground text-center">
                {filterType !== "all" || filterStatus !== "all" 
                  ? "Try adjusting your filters to see more notifications."
                  : "You're all caught up! No new notifications at the moment."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);
            
            return (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${
                  !notification.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""
                } ${
                  notification.message.toLowerCase().includes('submission') ||
                  notification.message.toLowerCase().includes('alert') ||
                  notification.message.toLowerCase().includes('high-risk')
                    ? 'notification-highlight'
                    : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${
                        notification.priority === "high" ? "bg-destructive/10" :
                        notification.priority === "medium" ? "bg-warning/10" :
                        "bg-success/10"
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          notification.priority === "high" ? "text-destructive" :
                          notification.priority === "medium" ? "text-warning" :
                          "text-success"
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </h3>
                          <Badge variant={getTypeColor(notification.type) as any} className="text-xs">
                            {notification.type.replace("-", " ")}
                          </Badge>
                          <Badge 
                            variant={getPriorityColor(notification.priority) as any}
                            className="text-xs"
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          {notification.studentName && (
                            <span>Student: {notification.studentName}</span>
                          )}
                          {notification.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}