import { NavLink, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  navigation: NavigationItem[];
}

export function DashboardSidebar({ navigation }: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">SH</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">SchoolHub</span>
        </div>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-sidebar-primary" : "text-sidebar-foreground group-hover:text-sidebar-primary"
                        )}
                      />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}