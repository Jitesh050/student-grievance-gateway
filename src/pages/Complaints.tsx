
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/MainLayout";
import ComplaintListItem from "@/components/ComplaintListItem";
import { 
  MOCK_COMPLAINTS, 
  filterComplaintsByStudentId, 
  filterComplaintsByStatus,
  filterComplaintsByCategory,
  sortComplaints 
} from "@/lib/mock-data";
import { Complaint, COMPLAINT_STATUS_OPTIONS, COMPLAINT_CATEGORY_OPTIONS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Complaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    // Simulate API call to fetch complaints
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (user) {
          const userComplaints = filterComplaintsByStudentId(MOCK_COMPLAINTS, user.studentId || "");
          setComplaints(userComplaints);
          setFilteredComplaints(userComplaints);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  useEffect(() => {
    let result = [...complaints];
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = filterComplaintsByStatus(result, statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = filterComplaintsByCategory(result, categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        complaint =>
          complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sort
    result = sortComplaints(result, sortOrder);
    
    setFilteredComplaints(result);
  }, [complaints, statusFilter, categoryFilter, searchQuery, sortOrder]);

  // Compute counts by status for tabs
  const counts = {
    all: complaints.length,
    pending: complaints.filter(c => c.status === "pending").length,
    inProgress: complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    rejected: complaints.filter(c => c.status === "rejected").length,
  };
  
  const handleTabChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Complaints</h1>
            <p className="text-muted-foreground">View and track all your submitted complaints</p>
          </div>
          <Button asChild>
            <Link to="/complaints/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Complaint
            </Link>
          </Button>
        </div>

        {/* Filters and search */}
        <div className="glass-card rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {COMPLAINT_CATEGORY_OPTIONS.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priority-high">Highest Priority</SelectItem>
                  <SelectItem value="priority-low">Lowest Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs and Complaints List */}
        <Tabs defaultValue="all" value={statusFilter} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All <span className="ml-1">({counts.all})</span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending <span className="ml-1">({counts.pending})</span>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress <span className="ml-1">({counts.inProgress})</span>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved <span className="ml-1">({counts.resolved})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected <span className="ml-1">({counts.rejected})</span>
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse flex flex-col w-full space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-muted rounded-lg h-24 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <div>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint, index) => (
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
                  className="glass-card rounded-lg p-8 text-center"
                >
                  <h3 className="text-lg font-medium mb-2">No complaints found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                      ? "Try changing your filters or search query"
                      : "You haven't submitted any complaints yet"}
                  </p>
                  {!searchQuery && statusFilter === "all" && categoryFilter === "all" && (
                    <Button asChild>
                      <Link to="/complaints/new">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Complaint
                      </Link>
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Complaints;
