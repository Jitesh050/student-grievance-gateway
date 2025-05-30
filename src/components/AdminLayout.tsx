
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Home,
  FileText,
  Users,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTransition, setPageTransition] = useState(false);

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      setPageTransition(true);
      setTimeout(() => {
        navigate(path);
        setPageTransition(false);
      }, 300);
    }
  };

  // Navigation items for the admin sidebar
  const navigationItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: Home,
    },
    {
      title: "All Complaints",
      path: "/admin/complaints",
      icon: FileText,
    },
    {
      title: "Manage Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  // Set page title based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let title = "Admin - ComplainHub";
    
    if (pathSegments.length > 1) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) + " - Admin Portal";
    }
    
    document.title = title;
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="glass-surface border-r backdrop-blur-xl">
          <SidebarHeader className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="glow-effect">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="gradient-text font-bold text-lg">Admin Portal</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground">Admin Controls</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        className={`w-full rounded-xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? "bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border border-primary/20"
                            : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                        }`}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                        {location.pathname === item.path && (
                          <ChevronRight className="h-4 w-4 ml-auto text-primary" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-white/20 dark:border-gray-700/30">
            <div className="p-4">
              <div className="flex items-center mb-4 p-3 glass-surface rounded-xl border">
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-purple-500 text-white">
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                </Avatar>
                
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-primary">Administrator</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start glass-button rounded-xl"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 w-full">
          <header className="flex items-center justify-between px-6 py-4 glass-surface border-b backdrop-blur-xl h-16">
            <div className="flex items-center">
              <SidebarTrigger className="glass-button rounded-lg" />
              <div className="ml-4">
                <h1 className="text-xl font-semibold">
                  {navigationItems.find(
                    (item) => item.path === location.pathname
                  )?.title || "Admin Dashboard"}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            <motion.div
              initial={{ opacity: pageTransition ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
