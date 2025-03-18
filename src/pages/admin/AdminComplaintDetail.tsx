import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { getComplaintById, updateComplaint, addComment } from "@/lib/mock-data";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Complaint, Comment, UserRole, COMPLAINT_STATUS_OPTIONS } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Clock,
  Tag,
  School,
  User,
  BookOpen,
  Flag,
  Check,
  X,
  Loader2,
  Send,
} from "lucide-react";

const AdminComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [rejectReason, setRejectReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const data = await getComplaintById(id);
          setComplaint(data);
          setSelectedStatus(data.status);
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

  if (isLoading || !complaint) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const handleUpdateStatus = async () => {
    if (!user || !complaint) return;

    setIsUpdating(true);
    try {
      // For "rejected" status, require a reason
      if (selectedStatus === "rejected" && !rejectReason.trim()) {
        toast.error("Please provide a reason for rejection");
        return;
      }

      const updates = {
        ...complaint,
        status: selectedStatus,
        ...(selectedStatus === "rejected" && { rejectionReason: rejectReason }),
        ...(selectedStatus === "in-progress" && { assignedTo: user.name }),
        ...(selectedStatus === "resolved" && { resolvedAt: new Date() }),
      };

      await updateComplaint(updates);
      setComplaint(updates);
      toast.success("Complaint status updated successfully");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating complaint:", error);
      toast.error("Failed to update complaint status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !complaint || !newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      // Add comment to the complaint
      const commentData = {
        complaintId: complaint.id,
        userId: user.id,
        userName: user.name,
        userRole: "admin" as UserRole, // Add proper type cast here
        content: newComment,
      };
      
      const updatedComplaint = await addComment(commentData);
      setComplaint(updatedComplaint);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Complaint Details</h1>
          <p className="text-muted-foreground">
            View and manage complaint details, update status, and add comments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complaint Details */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Complaint Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Title:</p>
                <p>{complaint.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Description:</p>
                <p>{complaint.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Category:</p>
                <p>{complaint.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Priority:</p>
                <p>{complaint.priority}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status:</p>
                <StatusBadge status={complaint.status} />
              </div>
              <div>
                <p className="text-sm font-medium">Submitted By:</p>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{complaint.studentName.charAt(0)}</AvatarFallback>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${complaint.studentName}`} />
                  </Avatar>
                  <div>
                    <p className="font-medium">{complaint.studentName}</p>
                    <p className="text-muted-foreground text-xs">
                      {complaint.studentId}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Department:</p>
                <p>{complaint.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Submitted Date:</p>
                <p>
                  {format(new Date(complaint.createdAt), "MMM dd, yyyy hh:mm a")}
                </p>
              </div>
              {complaint.resolvedAt && (
                <div>
                  <p className="text-sm font-medium">Resolved Date:</p>
                  <p>
                    {format(new Date(complaint.resolvedAt), "MMM dd, yyyy hh:mm a")}
                  </p>
                </div>
              )}
              {complaint.assignedTo && (
                <div>
                  <p className="text-sm font-medium">Assigned To:</p>
                  <p>{complaint.assignedTo}</p>
                </div>
              )}
              {complaint.rejectionReason && (
                <div>
                  <p className="text-sm font-medium">Rejection Reason:</p>
                  <p>{complaint.rejectionReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status Update */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Update Status</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Update Complaint Status
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Update Complaint Status</DialogTitle>
                  <DialogDescription>
                    Select the new status for this complaint.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="status" className="text-right">
                      Status
                    </label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPLAINT_STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedStatus === "rejected" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="rejectReason" className="text-right">
                        Rejection Reason
                      </label>
                      <Textarea
                        id="rejectReason"
                        className="col-span-3"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter rejection reason"
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleUpdateStatus} disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Comments Section */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {complaint.comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {complaint.comments.map((comment) => (
                <div key={comment.id} className="border rounded-md p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`} />
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comment.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), "MMM dd, yyyy hh:mm a")}
                        </p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          <div className="mt-6">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              className="mt-2 w-full"
              onClick={handleSubmitComment}
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Add Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminComplaintDetail;
