
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Complaint } from "@/lib/types";

interface ComplaintUpdateFormProps {
  complaint: Complaint;
  onUpdate: (updatedData: Partial<Complaint>) => void;
  onCancel: () => void;
}

const ComplaintUpdateForm = ({ 
  complaint, 
  onUpdate, 
  onCancel 
}: ComplaintUpdateFormProps) => {
  const [status, setStatus] = useState(complaint.status);
  const [updateDescription, setUpdateDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updateDescription.trim()) {
      toast.error("Please provide a description for this update");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create an update with timestamp and description
    const update = {
      date: new Date().toISOString(),
      description: updateDescription,
      status: status,
      by: "Admin"
    };
    
    // Update the complaint with new status and add the update to history
    const updatedData = {
      status,
      updates: [...(complaint.updates || []), update]
    };
    
    // Call the onUpdate function passed from parent
    onUpdate(updatedData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-1">Update Status</label>
        <Select
          value={status}
          onValueChange={setStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Update Description</label>
        <Textarea
          placeholder="Provide details about this status update..."
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          This description will be visible to the student who submitted the complaint.
        </p>
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting || !updateDescription.trim()}
        >
          {isSubmitting ? "Updating..." : "Update Complaint"}
        </Button>
      </div>
    </form>
  );
};

export default ComplaintUpdateForm;
