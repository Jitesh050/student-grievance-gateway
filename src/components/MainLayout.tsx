
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
  PlusCircle,
  LogOut,
  ChevronRight,
  Shield,
  Zap,
} from "lucide-react";

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

  const navigationItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
      color: "bg-blue-400",
    },
    {
      title: "My Complaints",
      path: "/complaints",
      icon: FileText,
      color: "bg-green-400",
    },
    {
      title: "New Complaint",
      path: "/complaints/new",
      icon: PlusCircle,
      color: "bg-yellow-400",
    },
  ];

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let title = "ComplainHub - College Complaint System";
    
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      title = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) + " - ComplainHub";
    }
    
    document.title = title;
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-white dark:bg-gray-900">
        <Sidebar className="bg-white dark:bg-gray-900 border-r-4 border-black">
          <SidebarHeader className="px-6 py-6 border-b-4 border-black">
            <div className="flex items-center gap-3">
              <div className="bg-red-400 p-2 border-4 border-black">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <span className="text-black dark:text-white font-black text-xl tracking-tight">ComplainHub</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-black dark:text-white font-bold text-sm uppercase tracking-wider mb-4">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-3">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        className={`w-full border-4 border-black font-bold text-black transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgb(0,0,0)] ${
                          location.pathname === item.path
                            ? `${item.color} shadow-[4px_4px_0px_0px_rgb(0,0,0)]`
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                        {location.pathname === item.path && (
                          <Zap className="h-4 w-4 ml-auto" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t-4 border-black">
            <div className="p-4">
              <div className="flex items-center mb-4 p-4 bg-purple-400 border-4 border-black">
                <Avatar className="border-4 border-black">
                  <AvatarFallback className="bg-black text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                </Avatar>
                
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold text-black">{user?.name}</p>
                  <p className="text-xs text-black/70 font-medium">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start bg-red-400 text-black border-4 border-black font-bold hover:bg-red-300 shadow-[2px_2px_0px_0px_rgb(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgb(0,0,0)]"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 w-full">
          <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b-4 border-black h-20">
            <div className="flex items-center">
              <SidebarTrigger className="bg-orange-400 text-black border-4 border-black font-bold hover:bg-orange-300 shadow-[2px_2px_0px_0px_rgb(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgb(0,0,0)]" />
              <div className="ml-6">
                <h1 className="text-2xl font-black text-black dark:text-white">
                  {navigationItems.find(
                    (item) => item.path === location.pathname
                  )?.title || "ComplainHub"}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-800">
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
