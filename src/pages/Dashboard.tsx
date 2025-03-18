
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/MainLayout";
import StatisticCard from "@/components/StatisticCard";
import ComplaintListItem from "@/components/ComplaintListItem";
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
      <div className="space-y-8">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's an overview of your complaints and their status
              </p>
            </div>
            <Button asChild>
              <Link to="/complaints/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Complaint
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Complaints</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/complaints">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col w-full space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-muted rounded-lg h-24 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {recentComplaints.length > 0 ? (
                recentComplaints.map((complaint, index) => (
                  <ComplaintListItem
                    key={complaint.id}
                    complaint={complaint}
                    index={index}
                  />
                ))
              ) : (
                <div className="glass-card rounded-lg p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No complaints yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any complaints yet. Start by creating your first complaint.
                  </p>
                  <Button asChild>
                    <Link to="/complaints/new">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Complaint
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
