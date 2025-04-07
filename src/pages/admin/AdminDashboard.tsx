
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import StatisticCard from "@/components/StatisticCard";
import ComplaintListItem from "@/components/ComplaintListItem";
import { MOCK_COMPLAINTS, updateComplaintStatus, sortComplaints } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/lib/types";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCircle,
  Building,
  ArrowRight,
  BarChart3,
  PieChart,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as ReChartPie, Pie, Cell, Legend } from "recharts";

// Define colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Generate mock complaint categories data
const categoryData = [
  { name: "Infrastructure", value: 35 },
  { name: "Academic", value: 25 },
  { name: "Administrative", value: 20 },
  { name: "Hostel", value: 15 },
  { name: "Canteen", value: 5 },
];

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch complaints
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const sortedComplaints = sortComplaints(MOCK_COMPLAINTS, "newest");
        setComplaints(sortedComplaints);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Calculate statistics
  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;
  const pendingComplaints = complaints.filter(c => c.status === "pending").length;
  const inProgressComplaints = complaints.filter(c => c.status === "in-progress").length;
  const recentComplaints = complaints.slice(0, 5);

  // Function to handle complaint status change
  const handleStatusChange = async (id: string, status: Complaint["status"]) => {
    try {
      // Update the complaint status
      const updatedComplaint = updateComplaintStatus(id, status, {
        rejectionReason: status === "rejected" ? "The complaint does not fall under our purview." : undefined,
        assignedTo: status === "in-progress" ? "IT Department" : undefined,
      });
      
      if (updatedComplaint) {
        // Update local state
        setComplaints(
          complaints.map(c => (c.id === id ? updatedComplaint : c))
        );
        
        toast.success(`Complaint status updated to ${status}`);
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
      toast.error("Failed to update complaint status");
    }
  };

  // Generate chart data
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const chartData = lastSevenDays.map(date => {
    const dateString = date.toISOString().split('T')[0];
    const complaints = MOCK_COMPLAINTS.filter(
      c => c.createdAt.toISOString().split('T')[0] === dateString
    );
    
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: complaints.length,
      resolved: complaints.filter(c => c.status === "resolved").length,
      pending: complaints.filter(c => c.status === "pending").length,
    };
  });

  // Custom pie chart label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <AdminLayout>
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
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Overview of all complaints and system statistics
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/complaints">
                View All Complaints
                <ArrowRight className="ml-2 h-4 w-4" />
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
            title="Pending Review"
            value={pendingComplaints}
            icon={Clock}
            trend={{ value: 12, isPositive: false }}
            index={1}
          />
          <StatisticCard
            title="In Progress"
            value={inProgressComplaints}
            icon={UserCircle}
            index={2}
          />
          <StatisticCard
            title="Resolved"
            value={resolvedComplaints}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
            index={3}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Complaint Trends</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#0284c7"
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorResolved)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    stroke="#eab308"
                    fillOpacity={1}
                    fill="url(#colorPending)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Complaints by Category</h2>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ReChartPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  <Tooltip formatter={(value) => [`${value} complaints`, 'Count']} />
                </ReChartPie>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent complaints */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Complaints</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/complaints">
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
                    onStatusChange={handleStatusChange}
                    isAdmin={true}
                    index={index}
                  />
                ))
              ) : (
                <div className="glass-card rounded-lg p-8 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No complaints found</h3>
                  <p className="text-muted-foreground">
                    There are no complaints in the system yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
