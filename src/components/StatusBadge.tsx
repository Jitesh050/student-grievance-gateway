
import { cn } from "@/lib/utils";
import { ComplaintStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
  showText?: boolean;
}

const StatusBadge = ({ status, className, showText = true }: StatusBadgeProps) => {
  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "in-progress":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "resolved":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusDot = (status: ComplaintStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: ComplaintStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit",
        getStatusColor(status),
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", getStatusDot(status))} />
      {showText && <span>{getStatusText(status)}</span>}
    </div>
  );
};

export default StatusBadge;
