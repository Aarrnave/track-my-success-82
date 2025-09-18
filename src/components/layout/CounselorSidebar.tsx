import { NavLink, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface CounselorSidebarProps {
  navigation: NavigationItem[];
}

export function CounselorSidebar({ navigation }: CounselorSidebarProps) {
  const location = useLocation();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-white">SH</span>
          </div>
          <div>
            <div className="text-lg font-semibold text-sidebar-foreground">SchoolHub</div>
            <div className="text-xs text-muted-foreground">Counselor Portal</div>
          </div>
        </div>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/20 shadow-lg"
                          : "text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent/50 hover:border hover:border-primary/10"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-all duration-200",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}
                      />
                      {item.name}
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        
        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            Version 2.1.0
          </div>
        </div>
      </nav>
    </div>
  );
}