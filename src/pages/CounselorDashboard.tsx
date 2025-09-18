import { Users, AlertTriangle, Calendar, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const summaryStats = [
  {
    title: "Total Students",
    value: "198",
    change: "+5 this month",
    icon: Users,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  {
    title: "At-Risk Students", 
    value: "83",
    change: "-12 this week",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    title: "Pending Sessions",
    value: "7", 
    change: "3 today",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    title: "Completed Sessions",
    value: "45",
    change: "+8 this week", 
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10"
  }
];

const riskDistribution = [
  { name: "Low Risk", value: 115, color: "#4ade80" },
  { name: "Medium Risk", value: 35, color: "#facc15" },
  { name: "High Risk", value: 48, color: "#f87171" }
];

const branchData = [
  { branch: "CSE", students: 35, atRisk: 12 },
  { branch: "ECE", students: 32, atRisk: 8 },
  { branch: "IT", students: 38, atRisk: 15 },
  { branch: "MECH", students: 25, atRisk: 6 },
  { branch: "CIVIL", students: 31, atRisk: 10 },
  { branch: "EEE", students: 37, atRisk: 14 }
];

const attendanceTrend = [
  { month: "Jan", attendance: 85, fees: 90, academic: 78 },
  { month: "Feb", attendance: 87, fees: 88, academic: 82 },
  { month: "Mar", attendance: 84, fees: 85, academic: 80 },
  { month: "Apr", attendance: 89, fees: 92, academic: 85 },
  { month: "May", attendance: 91, fees: 94, academic: 87 },
  { month: "Jun", attendance: 88, fees: 89, academic: 84 }
];

const upcomingSessions = [
  { id: 1, student: "Priya Sharma", time: "10:00 AM", risk: "High", subject: "Academic Performance" },
  { id: 2, student: "Rahul Kumar", time: "11:30 AM", risk: "Medium", subject: "Attendance Issues" },
  { id: 3, student: "Anjali Singh", time: "2:00 PM", risk: "High", subject: "Fee Payment" },
  { id: 4, student: "Vikash Gupta", time: "3:30 PM", risk: "Low", subject: "Career Guidance" }
];

export default function CounselorDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Comprehensive analytics and insights for student management
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Session
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
            <TrendingUp className="h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card group hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={cn(
                  "p-3 rounded-xl transition-all duration-200 group-hover:scale-110",
                  stat.bgColor
                )}>
                  <IconComponent className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Student Risk Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium">
                  {item.name}
                </span>
                <Badge variant="secondary">{item.value}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Students per Branch */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-6">
            <BarChart className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Students per Branch</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="branch" 
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
                dataKey="students" 
                fill="hsl(var(--chart-2))" 
                radius={[8, 8, 0, 0]}
                name="Total Students"
              />
              <Bar 
                dataKey="atRisk" 
                fill="hsl(var(--destructive))" 
                radius={[8, 8, 0, 0]}
                name="At-Risk Students"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-success" />
          <h3 className="text-lg font-semibold">Performance Metrics</h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
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
            <Area
              type="monotone"
              dataKey="attendance"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.3}
              name="Attendance %"
            />
            <Area
              type="monotone"
              dataKey="fees"
              stackId="1"
              stroke="hsl(var(--success))"
              fill="hsl(var(--success))"
              fillOpacity={0.3}
              name="Fee Payment %"
            />
            <Area
              type="monotone"
              dataKey="academic"
              stackId="1"
              stroke="hsl(var(--warning))"
              fill="hsl(var(--warning))"
              fillOpacity={0.3}
              name="Academic Performance %"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Attendance Compliance</span>
              <span className="text-lg font-bold text-chart-1">79%</span>
            </div>
            <Progress value={79} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pass Percentage</span>
              <span className="text-lg font-bold text-success">98%</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fee Payment Rate</span>
              <span className="text-lg font-bold text-warning">79%</span>
            </div>
            <Progress value={79} className="h-2" />
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Today's Sessions</h3>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-medium">{session.student}</span>
                  <span className="text-sm text-muted-foreground">{session.subject}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge 
                  variant={session.risk === "High" ? "destructive" : session.risk === "Medium" ? "default" : "secondary"}
                >
                  {session.risk} Risk
                </Badge>
                <div className="text-sm font-medium">{session.time}</div>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}