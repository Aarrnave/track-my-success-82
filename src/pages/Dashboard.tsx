import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, AlertTriangle, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const quickStats = [
  {
    title: "Total Students",
    value: "1,247",
    change: "+12.5%",
    icon: Users,
    trend: "up",
    color: "text-primary"
  },
  {
    title: "At-Risk Students",
    value: "23",
    change: "-8.2%",
    icon: AlertTriangle,
    trend: "down",
    color: "text-destructive"
  },
  {
    title: "Active Sessions",
    value: "18",
    change: "+4.1%",
    icon: Calendar,
    trend: "up",
    color: "text-accent"
  },
  {
    title: "Avg Attendance",
    value: "87.4%",
    change: "+2.3%",
    icon: BookOpen,
    trend: "up",
    color: "text-success"
  }
];

// Full year attendance data - all 12 months
const attendanceTrend = [
  { month: "Jan", attendance: 85.2 },
  { month: "Feb", attendance: 87.1 },
  { month: "Mar", attendance: 86.8 },
  { month: "Apr", attendance: 88.2 },
  { month: "May", attendance: 87.4 },
  { month: "Jun", attendance: 89.1 },
  { month: "Jul", attendance: 86.9 },
  { month: "Aug", attendance: 88.5 },
  { month: "Sep", attendance: 89.8 },
  { month: "Oct", attendance: 87.6 },
  { month: "Nov", attendance: 88.9 },
  { month: "Dec", attendance: 86.3 }
];

const riskDistribution = [
  { name: "Low Risk", value: 1156, color: "hsl(var(--success))" },
  { name: "Medium Risk", value: 68, color: "hsl(var(--warning))" },
  { name: "High Risk", value: 23, color: "hsl(var(--destructive))" }
];

const departmentStats = [
  { department: "Computer Science", students: 320, attendance: 89.2 },
  { department: "Electronics", students: 285, attendance: 87.8 },
  { department: "Mechanical", students: 298, attendance: 85.4 },
  { department: "Civil", students: 244, attendance: 88.1 },
  { department: "Chemical", students: 100, attendance: 86.9 }
];

const todaysSessionsData = [
  { id: 1, student: "Alice Johnson", time: "10:00 AM", type: "Individual Counseling", status: "Completed" },
  { id: 2, student: "Bob Smith", time: "11:30 AM", type: "Career Guidance", status: "In Progress" },
  { id: 3, student: "Carol Brown", time: "2:00 PM", type: "Group Session", status: "Upcoming" },
  { id: 4, student: "David Wilson", time: "3:30 PM", type: "Academic Support", status: "Upcoming" },
  { id: 5, student: "Emma Davis", time: "4:00 PM", type: "Academic Support", status: "Completed" },
  { id: 6, student: "Frank Miller", time: "4:30 PM", type: "Career Guidance", status: "Upcoming" }
];

const recentActivities = [
  {
    id: 1,
    type: "alert",
    message: "Alice Johnson flagged as high-risk student",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    type: "session",
    message: "Group counseling session completed - 25 students",
    time: "4 hours ago",
    priority: "normal"
  },
  {
    id: 3,
    type: "achievement",
    message: "Department attendance increased by 3.2%",
    time: "6 hours ago",
    priority: "positive"
  },
  {
    id: 4,
    type: "reminder",
    message: "Semester report submissions due in 3 days",
    time: "1 day ago",
    priority: "normal"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [dynamicStats, setDynamicStats] = useState(quickStats);

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.title === "Total Students" ? 
          (1247 + Math.floor(Math.random() * 10)).toString() :
        stat.title === "At-Risk Students" ? 
          (23 + Math.floor(Math.random() * 5)).toString() :
        stat.title === "Active Sessions" ? 
          (18 + Math.floor(Math.random() * 7)).toString() :
        stat.title === "Avg Attendance" ? 
          (87.4 + (Math.random() * 4 - 2)).toFixed(1) + "%" :
        stat.value
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Dr. Sarah</h1>
          <p className="text-muted-foreground">Here's what's happening with your students today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/counseling-request')} className="btn-white-hover">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button onClick={() => navigate('/reports-analytics')}>
            <GraduationCap className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-2xl font-bold ${stat.title === "Total Students" ? "text-success" : ""}`}>{stat.value}</p>
                      <Badge 
                        variant={stat.trend === "up" ? "default" : "secondary"}
                        className={stat.trend === "up" ? "bg-success text-success-foreground" : ""}
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend - Full Year Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Annual Performance Metrics</CardTitle>
            <CardDescription>Full year attendance trends (Jan-Dec) across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
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
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Risk Distribution</CardTitle>
            <CardDescription>Current risk assessment across all students</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
          <CardHeader>
            <CardTitle className="text-[hsl(var(--cocoa-brown))] font-bold">No. of students</CardTitle>
            <CardDescription className="text-[hsl(var(--cocoa-brown))]/80">Student count and attendance by department</CardDescription>
          </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="students" fill="hsl(var(--cocoa-brown))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Today's Sessions and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Sessions</CardTitle>
              <CardDescription>Scheduled counseling sessions for today</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/sessions')} className="btn-white-hover">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {todaysSessionsData.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-3 border rounded-lg transition-all duration-200 ${
                    session.status === "Completed" ? "session-completed" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{session.student}</p>
                      <p className="text-sm text-muted-foreground">{session.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.time}</p>
                      <Badge 
                        variant={
                          session.status === "Completed" ? "default" : 
                          session.status === "In Progress" ? "secondary" : 
                          "outline"
                        }
                        className={session.status === "Completed" ? "bg-success text-success-foreground" : ""}
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === "high" ? "bg-destructive" :
                    activity.priority === "positive" ? "bg-success" :
                    "bg-primary"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={
                      activity.priority === "high" ? "destructive" :
                      activity.priority === "positive" ? "default" :
                      "secondary"
                    }
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}