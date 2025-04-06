
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { getComplaintById, updateComplaintStatus, addCommentToComplaint } from "@/lib/mock-data";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  FileText,
  Check,
  X,
  Shield,
  Send,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Complaint, Comment, UserRole, COMPLAINT_STATUS_OPTIONS, ComplaintStatus } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus>("pending");
  const [rejectReason, setRejectReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const data = await getComplaintById(id);
          setComplaint(data);
          
          if (data) {
            setSelectedStatus(data.status);
          }
        }
      } catch (error) {
        console.error("Error fetching complaint:", error);
        toast.error("Failed to load complaint details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      if (!complaint) {
        toast.error("Complaint not found");
        return;
      }

      const additionalData = {
        ...(selectedStatus === "rejected" && { rejectionReason: rejectReason }),
        ...(selectedStatus === "in-progress" && { assignedTo: user.name }),
        ...(selectedStatus === "resolved" && { resolvedAt: new Date() }),
      };

      const updatedComplaint = await updateComplaintStatus(
        complaint.id, 
        selectedStatus, 
        additionalData
      );
      
      if (updatedComplaint) {
        setComplaint(updatedComplaint);
        toast.success("Complaint status updated successfully");
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
      toast.error("Failed to update complaint status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmittingComment(true);
    try {
      if (!complaint) return;

      const commentData = {
        complaintId: complaint.id,
        userId: user.id,
        userName: user.name,
        userRole: "admin" as UserRole,
        content: newComment,
      };
      
      await addCommentToComplaint(complaint.id, commentData);
      
      // Refresh the complaint data to include the new comment
      const updatedComplaint = await getComplaintById(complaint.id);
      if (updatedComplaint) {
        setComplaint(updatedComplaint);
        setNewComment("");
        toast.success("Comment added successfully");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back button and title */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Complaint Details</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col w-full space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded-lg h-24 w-full" />
              ))}
            </div>
          </div>
        ) : !complaint ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-2">Complaint not found</h2>
              <p className="text-muted-foreground mb-4">
                The complaint you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/admin/complaints")}>
                View All Complaints
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Complaint details card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold">{complaint.title}</h2>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {format(
                          new Date(complaint.createdAt),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{complaint.category}</span>
                    </div>
                    <Badge variant={complaint.priority === "high" ? "destructive" : complaint.priority === "medium" ? "default" : "secondary"}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{complaint.description}</p>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Student Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        <span className="font-medium">{complaint.studentName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ID:</span>{" "}
                        <span className="font-medium">{complaint.studentId}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Department:</span>{" "}
                        <span className="font-medium">{complaint.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Update Status</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Complaint Status</DialogTitle>
                        <DialogDescription>
                          Change the status of this complaint. This action will be logged and the student will be notified.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="status" className="text-sm font-medium">
                            Status
                          </label>
                          <Select 
                            value={selectedStatus} 
                            onValueChange={(value: string) => setSelectedStatus(value as ComplaintStatus)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {COMPLAINT_STATUS_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {selectedStatus === "rejected" && (
                          <div className="space-y-2">
                            <label htmlFor="reason" className="text-sm font-medium">
                              Rejection Reason
                            </label>
                            <Textarea
                              id="reason"
                              placeholder="Explain why this complaint is being rejected"
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateStatus} disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Status"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>

            {/* Comments section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Comments and Activity</h3>
              
              <div className="space-y-4">
                {complaint.comments && complaint.comments.length > 0 ? (
                  complaint.comments.map((comment, index) => (
                    <motion.div
                      key={comment.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg border"
                    >
                      <Avatar>
                        <AvatarFallback className={comment.userRole === "student" ? "bg-primary/20" : "bg-muted"}>
                          {comment.userName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{comment.userName}</p>
                            <Badge variant={comment.userRole === "student" ? "outline" : "secondary"} className="text-xs">
                              {comment.userRole === "student" ? "Student" : "Admin"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {format(
                              new Date(comment.createdAt),
                              "MMM d, yyyy 'at' h:mm a"
                            )}
                          </p>
                        </div>
                        <p className="mt-2 text-sm">{comment.content}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
                    <h4 className="text-lg font-medium">No comments yet</h4>
                    <p className="text-muted-foreground">
                      Be the first to add a comment to this complaint
                    </p>
                  </div>
                )}
              </div>
              
              {/* Add comment form */}
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Add Comment</h4>
                <div className="flex gap-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="self-end"
                  >
                    {isSubmittingComment ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminComplaintDetail;
