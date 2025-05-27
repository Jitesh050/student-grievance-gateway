
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
      className={`fixed bottom-8 right-8 z-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        asChild
        size="lg"
        className="h-16 w-16 rounded-none bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgb(0,0,0)] hover:shadow-[4px_4px_0px_0px_rgb(0,0,0)] transition-all duration-200 font-black"
      >
        <Link to={to} className="flex items-center justify-center group">
          <Icon className="h-8 w-8 transition-transform group-hover:rotate-90 duration-300" />
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingActionButton;
