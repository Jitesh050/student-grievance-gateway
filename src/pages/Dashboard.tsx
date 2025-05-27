
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
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-8 border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h1 className="text-headline mb-2">
                Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Student'}</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Here's an overview of your complaints and their current status
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass-surface px-4 py-2 rounded-full border">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">
                  {Math.round((resolvedComplaints / totalComplaints) * 100) || 0}% Resolved
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard
            title="Total Complaints"
            value={totalComplaints}
            icon={FileText}
            index={0}
          />
          <StatisticCard
            title="Resolved"
            value={resolvedComplaints}
            icon={CheckCircle}
            description={`${Math.round((resolvedComplaints / totalComplaints) * 100) || 0}% of total`}
            index={1}
          />
          <StatisticCard
            title="Pending"
            value={pendingComplaints}
            icon={Clock}
            index={2}
          />
          <StatisticCard
            title="Rejected"
            value={rejectedComplaints}
            icon={AlertCircle}
            index={3}
          />
        </div>

        {/* Recent complaints */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title">Recent Complaints</h2>
            <Button variant="ghost" size="sm" asChild className="glass-button">
              <Link to="/complaints">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-pulse flex flex-col w-full space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="glass-surface rounded-2xl h-24 w-full border" />
                ))}
              </div>
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
                  className="glass-card rounded-3xl p-12 text-center border"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-title mb-3">No complaints yet</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    You haven't submitted any complaints yet. Use the floating button below to create your first complaint.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
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
