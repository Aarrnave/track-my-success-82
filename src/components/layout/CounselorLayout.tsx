import { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard,
  TrendingUp,
  Calendar, 
  AlertTriangle, 
  Bell, 
  FileText,
  Settings,
  Menu,
  Search,
  User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CounselorSidebar } from "./CounselorSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Risk Prediction", href: "/risk-prediction", icon: TrendingUp },
  { name: "Counseling Sessions", href: "/sessions", icon: Calendar },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Reports & Analytics", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function CounselorLayout() {
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
          <CounselorSidebar navigation={navigation} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-sidebar lg:border-r lg:border-sidebar-border">
        <CounselorSidebar navigation={navigation} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-foreground">
                SchoolHub Admin
              </h1>
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search students, sessions..." 
                    className="pl-10 w-80"
                  />
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">Dr. Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground">Counselor</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dropdown-themed">
                <DropdownMenuItem 
                  onClick={() => window.location.href = '/profile'}
                  className="dropdown-item-selected"
                >
                  ✓ Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => {
                    if (confirm("Are you sure you want to sign out?")) {
                      alert("Signed out successfully!");
                      window.location.href = '/';
                    }
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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