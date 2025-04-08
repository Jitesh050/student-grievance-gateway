
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CMS</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">Student Login</Link>
              <Link to="/admin/signin" className="text-sm font-medium hover:text-primary transition-colors">Admin Login</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Campus Voice: <span className="text-primary">Simplified</span> Complaint Management
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                An intuitive platform for students to submit, track, and resolve campus complaints efficiently.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signin">
                  <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/20">
                    Student Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/admin/signin">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Admin Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
                <img
                  src="/placeholder.svg"
                  alt="Student using complaint platform"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold">College Complaint Management System</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2023 CMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
