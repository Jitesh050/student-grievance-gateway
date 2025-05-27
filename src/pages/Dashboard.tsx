
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/MainLayout";
import StatisticCard from "@/components/StatisticCard";
import ComplaintListItem from "@/components/ComplaintListItem";
import FloatingActionButton from "@/components/FloatingActionButton";
import { MOCK_COMPLAINTS, filterComplaintsByStudentId, sortComplaints } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/lib/types";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  MessageSquare,
  Zap,
  Target,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch complaints
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (user) {
          const userComplaints = filterComplaintsByStudentId(MOCK_COMPLAINTS, user.studentId || "");
          const sortedComplaints = sortComplaints(userComplaints, "newest");
          setComplaints(sortedComplaints);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  // Calculate statistics
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;
  const pendingComplaints = complaints.filter(c => c.status === "pending").length;
  const rejectedComplaints = complaints.filter(c => c.status === "rejected").length;
  const recentComplaints = complaints.slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-8 pb-20">
        {/* Hero Welcome Section - Neobrutalist Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgb(0,0,0)] p-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
                  Hey, <span className="text-white">{user?.name?.split(' ')[0] || 'Student'}</span>! 👋
                </h1>
                <p className="text-xl text-black/80 font-semibold max-w-2xl">
                  Ready to track your complaints and make your voice heard? Your dashboard is your command center.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-black text-white px-6 py-3 border-4 border-white font-bold text-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6" />
                    <span>{Math.round((resolvedComplaints / totalComplaints) * 100) || 0}% Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid - Bold Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-400 border-4 border-black shadow-[6px_6px_0px_0px_rgb(0,0,0)] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-black" />
              <span className="text-3xl font-black text-black">{totalComplaints}</span>
            </div>
            <h3 className="text-lg font-bold text-black">Total Complaints</h3>
            <p className="text-black/70 font-medium">All submissions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-400 border-4 border-black shadow-[6px_6px_0px_0px_rgb(0,0,0)] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-black" />
              <span className="text-3xl font-black text-black">{resolvedComplaints}</span>
            </div>
            <h3 className="text-lg font-bold text-black">Resolved</h3>
            <p className="text-black/70 font-medium">{Math.round((resolvedComplaints / totalComplaints) * 100) || 0}% success rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_rgb(0,0,0)] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-black" />
              <span className="text-3xl font-black text-black">{pendingComplaints}</span>
            </div>
            <h3 className="text-lg font-bold text-black">Pending</h3>
            <p className="text-black/70 font-medium">Awaiting review</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-red-400 border-4 border-black shadow-[6px_6px_0px_0px_rgb(0,0,0)] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-black" />
              <span className="text-3xl font-black text-black">{rejectedComplaints}</span>
            </div>
            <h3 className="text-lg font-bold text-black">Rejected</h3>
            <p className="text-black/70 font-medium">Need attention</p>
          </motion.div>
        </div>

        {/* Recent Complaints Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-2">Recent Activity</h2>
              <p className="text-muted-foreground text-lg font-medium">Keep track of your latest submissions</p>
            </div>
            <Button 
              asChild 
              className="bg-black text-white border-4 border-black hover:bg-white hover:text-black font-bold text-lg px-8 py-3 shadow-[4px_4px_0px_0px_rgb(0,0,0)] hover:shadow-[2px_2px_0px_0px_rgb(0,0,0)] transition-all"
            >
              <Link to="/complaints">
                View All
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 border-4 border-black h-24 w-full animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentComplaints.length > 0 ? (
                recentComplaints.map((complaint, index) => (
                  <ComplaintListItem
                    key={complaint.id}
                    complaint={complaint}
                    index={index}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-400 border-4 border-black shadow-[8px_8px_0px_0px_rgb(0,0,0)] p-12 text-center"
                >
                  <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-6 border-4 border-white">
                    <MessageSquare className="h-10 w-10" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-black mb-4">No Complaints Yet</h3>
                  <p className="text-black/80 font-medium text-lg mb-8 max-w-md mx-auto">
                    Ready to make your voice heard? Start by submitting your first complaint using the button below.
                  </p>
                  
                  <Button 
                    asChild 
                    className="bg-black text-white border-4 border-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgb(255,255,255)] hover:shadow-[2px_2px_0px_0px_rgb(255,255,255)] transition-all"
                  >
                    <Link to="/complaints/new">
                      <Target className="mr-2 h-5 w-5" />
                      Submit First Complaint
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Floating Action Button */}
        <FloatingActionButton 
          to="/complaints/new" 
          icon={PlusCircle}
          label="New Complaint"
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
