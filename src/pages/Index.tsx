
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  const dashboardLink = user 
    ? (user.role === "admin" ? "/admin" : "/dashboard") 
    : "/signin";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    College Complaint Management System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Submit and track complaints, get timely responses, and help improve campus life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signin">
                    <Button size="lg" className="gap-1">
                      <FileText className="h-5 w-5" />
                      Student Login
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/admin/signin">
                    <Button size="lg" className="gap-1" variant="outline">
                      <Shield className="h-5 w-5" />
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <img
                    src="/placeholder.svg"
                    width={500}
                    height={500}
                    alt="College Complaint System"
                    className="rounded-lg object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamlined Complaint Process
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform makes it easy for students to submit and track complaints while providing administrators with tools to manage and resolve issues efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm"
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link to={dashboardLink}>
                <Button size="lg">
                  {user ? "Go to Dashboard" : "Get Started"} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 College Complaint Management System. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

// Feature list for the features section
const features = [
  {
    title: "Easy Submission",
    description: "Submit complaints in minutes with our user-friendly form",
    icon: FileText,
  },
  {
    title: "Real-time Tracking",
    description: "Track the status of your complaints in real-time",
    icon: Clock,
  },
  {
    title: "Quick Resolution",
    description: "Get timely responses and resolutions from administrators",
    icon: Check,
  },
  {
    title: "Secure Communication",
    description: "Communicate securely with administrators through comments",
    icon: Shield,
  },
  {
    title: "Organized Dashboard",
    description: "View all your complaints in one organized dashboard",
    icon: BookOpen,
  },
  {
    title: "Priority System",
    description: "Mark complaints as low, medium, or high priority",
    icon: Flag,
  },
];

export default Index;
