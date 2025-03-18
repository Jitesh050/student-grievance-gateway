
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
import {
  Home,
  FileText,
  PlusCircle,
  LogOut,
  User,
  ChevronRight,
  Bell,
} from "lucide-react";

<lov-add-dependency>framer-motion@11.0.3</lov-add-dependency>

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  // Navigation items for the sidebar
  const navigationItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "My Complaints",
      path: "/complaints",
      icon: FileText,
    },
    {
      title: "New Complaint",
      path: "/complaints/new",
      icon: PlusCircle,
    },
  ];

  // Set page title based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let title = "College Complaint System";
    
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) + " - College Complaint System";
    }
    
    document.title = title;
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-6 py-5">
            <div className="flex items-center gap-2 text-primary font-medium text-lg">
              <FileText className="w-5 h-5" />
              <span>CMS</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        className={`w-full ${
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary"
                            : ""
                        }`}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                        {location.pathname === item.path && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <Avatar>
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                </Avatar>
                
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 w-full">
          <header className="flex items-center justify-between px-6 py-4 border-b border-border h-16">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-xl font-medium">
                  {navigationItems.find(
                    (item) => item.path === location.pathname
                  )?.title || "College Complaint System"}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
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

export default MainLayout;
