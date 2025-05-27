
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  to,
  icon: Icon = Plus,
  label = "Add",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className={`floating-action ${className}`}
    >
      <Button
        asChild
        size="lg"
        className="h-14 w-14 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 shadow-2xl hover:shadow-primary/30 transition-all duration-300"
      >
        <Link to={to} className="flex items-center justify-center group">
          <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingActionButton;
