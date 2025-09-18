import { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard,
  Users,
  BarChart3,
  BookOpen, 
  Calendar, 
  AlertTriangle, 
  MessageSquare, 
  Bell, 
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "./DashboardSidebar";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Attendance & Academics", href: "/attendance", icon: BookOpen },
  { name: "Sessions", href: "/sessions", icon: Calendar },
  { name: "Risk Prediction", href: "/risk-prediction", icon: AlertTriangle },
  { name: "Counseling Request", href: "/counseling-request", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
          <DashboardSidebar navigation={navigation} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-sidebar lg:border-r lg:border-sidebar-border">
        <DashboardSidebar navigation={navigation} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">
              SchoolHub Faculty Dashboard
            </h1>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Welcome, Dr. Sarah Johnson
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}