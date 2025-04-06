
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  Shield, 
  ArrowRight, 
  Clock as ClockIcon, 
  Check as CheckIcon, 
  BookOpen as BookOpenIcon, 
  Flag as FlagIcon 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Simple testimonial component
const TestimonialCard = ({ testimonial }) => (
  <Card className="border-0 shadow-md dark:shadow-gray-800/10 bg-gray-50 dark:bg-gray-900 h-full">
    <CardContent className="p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.department}</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.comment}"</p>
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  const { user } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  const dashboardLink = user 
    ? (user.role === "admin" ? "/admin" : "/dashboard") 
    : "/signin";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero section */}
      <main className="relative">
        <div className="absolute inset-0 bg-blue-500 dark:bg-blue-900 opacity-5 pattern-grid-lg"></div>
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                    College Complaint Management System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Submit and track complaints effortlessly. Get timely responses and contribute to improving campus life.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link to="/signin">
                    <Button size="lg" className="gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-full shadow-md transition-all hover:shadow-lg">
                      <FileText className="h-5 w-5" />
                      Student Login
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link to="/admin/signin">
                    <Button size="lg" className="gap-1 rounded-full shadow-md transition-all hover:shadow-lg" variant="outline">
                      <Shield className="h-5 w-5" />
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative lg:ml-auto"
              >
                <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="/placeholder.svg"
                    alt="College Complaint System"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fast Response</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Typically within 24hrs</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Secure & Private</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Your data is safe with us</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950/50 rounded-t-[40px] md:rounded-t-[60px]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                What Students Say
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Trusted by Students Across Campus
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                See what other students are saying about their experience with our platform.
              </p>
            </div>
            
            {/* Replaced carousel with a simple grid for testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-blue-50 dark:bg-gray-900/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Streamlined Complaint Process
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Our platform makes it easy for students to submit and track complaints while providing administrators with tools to manage and resolve issues efficiently.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group flex flex-col items-center space-y-4 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                    <feature.icon className="h-7 w-7 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link to={dashboardLink}>
                <Button size="lg" className="gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-full shadow-md transition-all hover:shadow-lg">
                  {user ? "Go to Dashboard" : "Get Started"} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2023 College Complaint Management System. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-6">
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
                Privacy
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
                Support
              </Link>
            </nav>
          </div>
        </div>
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
    icon: ClockIcon,
  },
  {
    title: "Quick Resolution",
    description: "Get timely responses and resolutions from administrators",
    icon: CheckIcon,
  },
  {
    title: "Secure Communication",
    description: "Communicate securely with administrators through comments",
    icon: Shield,
  },
  {
    title: "Organized Dashboard",
    description: "View all your complaints in one organized dashboard",
    icon: BookOpenIcon,
  },
  {
    title: "Priority System",
    description: "Mark complaints as low, medium, or high priority",
    icon: FlagIcon,
  },
];

// Testimonial data for carousel
const testimonials = [
  {
    name: "Alex Johnson",
    department: "Computer Science",
    comment: "The complaint system made it so easy to report issues with campus facilities. Got a response within 24 hours!"
  },
  {
    name: "Priya Sharma",
    department: "Business Administration",
    comment: "I love how I can track my complaint status in real-time. The interface is intuitive and user-friendly."
  },
  {
    name: "Michael Chen",
    department: "Engineering",
    comment: "This platform has dramatically improved how complaints are handled. The administration is much more responsive now."
  },
  {
    name: "Sophia Williams",
    department: "Psychology",
    comment: "Being able to securely communicate with staff about my issues without having to visit multiple offices is fantastic."
  },
  {
    name: "James Taylor",
    department: "Fine Arts",
    comment: "The priority system ensures urgent matters get addressed quickly. Really helpful during exam periods!"
  }
];

export default Index;
