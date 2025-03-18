
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import StatusBadge from "@/components/StatusBadge";
import { 
  getComplaintById, 
  addCommentToComplaint,
  updateComplaintStatus
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Complaint, Comment } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MessageSquare,
  SendHorizonal,
  ArrowLeft,
  FileBadge,
  Building,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

const AdminComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [assignmentDepartment, setAssignmentDepartment] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    // Fetch complaint details
    const fetchComplaintDetails = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (id) {
          const complaintData = getComplaintById(id);
          
          if (complaintData) {
            setComplaint(complaintData);
          } else {
            toast.error("Complaint not found");
            navigate("/admin/complaints");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id, navigate]);

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !complaint || !user) return;
    
    setIsSubmittingComment(true);
    
    try {
      const commentData = {
        complaintId: complaint.id,
        userId: user.id,
        userName: user.name,
        userRole: user.role as "admin", // Cast to the specific union type
        content: newComment,
      };
      
      // Add the comment
      const addedComment = addCommentToComplaint(complaint.id, commentData);
      
      // Update local state
      setComplaint({
        ...complaint,
        comments: [...complaint.comments, addedComment],
        updatedAt: new Date(),
      });
      
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleStatusUpdate = async (status: Complaint["status"]) => {
    if (!complaint) return;
    
    setIsUpdatingStatus(true);
    
    try {
      let additionalData = {};
      
      if (status === "rejected") {
        if (!rejectionReason.trim()) {
          toast.error("Please provide a rejection reason");
          return;
        }
        additionalData = { rejectionReason };
      } else if (status === "in-progress") {
        if (!assignmentDepartment.trim()) {
          toast.error("Please specify the department");
          return;
        }
        additionalData = { assignedTo: assignmentDepartment };
      } else if (status === "resolved") {
        additionalData = { resolvedAt: new Date() };
      }
      
      const updatedComplaint = updateComplaintStatus(complaint.id, status, additionalData);
      
      if (updatedComplaint) {
        setComplaint(updatedComplaint);
        toast.success(`Complaint marked as ${status}`);
        
        // Add a system comment about the status change
        const statusChangeComment = {
          complaintId: complaint.id,
          userId: user?.id || "system",
          userName: user?.name || "System",
          userRole: "admin",
          content: getStatusChangeMessage(status, additionalData),
        };
        
        addCommentToComplaint(complaint.id, statusChangeComment);
        
        // Reset form fields
        setRejectionReason("");
        setAssignmentDepartment("");
      }
    } catch (error) {
      toast.error("Failed to update complaint status");
      console.error(error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusChangeMessage = (status: Complaint["status"], additionalData: any) => {
    switch (status) {
      case "in-progress":
        return `This complaint has been assigned to ${additionalData.assignedTo} and is now being processed.`;
      case "resolved":
        return "This complaint has been marked as resolved.";
      case "rejected":
        return `This complaint has been rejected. Reason: ${additionalData.rejectionReason}`;
      default:
        return `Complaint status changed to ${status}.`;
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-pulse space-y-6 w-full max-w-4xl">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!complaint) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold mt-4">Complaint Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The complaint you're looking for doesn't exist.
          </p>
          <Button className="mt-6" onClick={() => navigate("/admin/complaints")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Complaints
          </Button>
        </div>
      </AdminLayout>
    );
  }

  // Sort comments by most recent first
  const sortedComments = [...complaint.comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/admin/complaints")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Complaints
        </Button>

        {/* Complaint details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">{complaint.title}</h1>
            <StatusBadge status={complaint.status} className="text-sm py-1.5 px-3" />
          </div>

          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Submitted on:</span>
                  <span className="ml-2 font-medium">
                    {format(new Date(complaint.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Last updated:</span>
                  <span className="ml-2 font-medium">
                    {format(new Date(complaint.updatedAt), "MMMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <FileBadge className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2 font-medium capitalize">
                    {complaint.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Submitted by:</span>
                  <span className="ml-2 font-medium">
                    {complaint.studentName} ({complaint.studentId})
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Department:</span>
                  <span className="ml-2 font-medium">
                    {complaint.department}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Priority:</span>
                  <span 
                    className={`ml-2 font-medium ${
                      complaint.priority === 'high' 
                        ? 'text-red-500' 
                        : complaint.priority === 'medium' 
                        ? 'text-amber-500' 
                        : 'text-green-500'
                    }`}
                  >
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-3">Description</h3>
              <p className="whitespace-pre-line text-muted-foreground">
                {complaint.description}
              </p>
            </div>

            {complaint.status === "resolved" && complaint.resolvedAt && (
              <div className="mt-6 bg-green-500/10 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">
                  Resolved on {format(new Date(complaint.resolvedAt), "MMMM d, yyyy")}
                </h3>
                <p className="text-muted-foreground">
                  This complaint has been successfully resolved.
                </p>
              </div>
            )}

            {complaint.status === "rejected" && complaint.rejectionReason && (
              <div className="mt-6 bg-red-500/10 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-red-700 dark:text-red-400 mb-2">
                  Complaint Rejected
                </h3>
                <p className="text-muted-foreground">
                  {complaint.rejectionReason}
                </p>
              </div>
            )}

            {complaint.status === "in-progress" && complaint.assignedTo && (
              <div className="mt-6 bg-blue-500/10 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">
                  In Progress
                </h3>
                <p className="text-muted-foreground">
                  This complaint is currently being handled by the {complaint.assignedTo}.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              {complaint.status === "pending" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Clock className="mr-2 h-4 w-4" />
                        Start Processing
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Complaint</DialogTitle>
                        <DialogDescription>
                          Specify which department will handle this complaint.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department</label>
                          <Input
                            placeholder="e.g., IT Department, Academic Affairs"
                            value={assignmentDepartment}
                            onChange={(e) => setAssignmentDepartment(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setAssignmentDepartment("")}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleStatusUpdate("in-progress")}
                          disabled={isUpdatingStatus || !assignmentDepartment.trim()}
                        >
                          {isUpdatingStatus ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>Start Processing</>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Complaint
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Complaint</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for rejecting this complaint.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Rejection Reason</label>
                          <Textarea
                            placeholder="Explain why this complaint is being rejected..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setRejectionReason("")}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleStatusUpdate("rejected")}
                          disabled={isUpdatingStatus || !rejectionReason.trim()}
                        >
                          {isUpdatingStatus ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Rejecting...
                            </>
                          ) : (
                            <>Reject Complaint</>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              {complaint.status === "in-progress" && (
                <Button onClick={() => handleStatusUpdate("resolved")}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Resolved
                </Button>
              )}
            </div>
          </div>

          {/* Comments section */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            {/* Add comment */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Add a Comment</h3>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write your comment here..."
                    className="mb-3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleCommentSubmit}
                      disabled={!newComment.trim() || isSubmittingComment}
                    >
                      {isSubmittingComment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendHorizonal className="mr-2 h-4 w-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments list */}
            {sortedComments.length > 0 ? (
              <div className="space-y-4">
                {sortedComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`glass-card rounded-xl p-4 ${
                      comment.userRole === "admin" ? "border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {comment.userName.charAt(0)}
                        </AvatarFallback>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{comment.userName}</p>
                            <p className="text-xs text-muted-foreground">
                              {comment.userRole === "admin" ? "Administrator" : "Student"}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                        <p className="mt-3">{comment.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-6 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No comments yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to leave a comment on this complaint.
                </p>
              </div>
            )}
          </section>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminComplaintDetail;
