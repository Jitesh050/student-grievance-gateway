
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  MessageSquare,
  Bell,
  ShieldCheck
} from "lucide-react";

const LandingPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Redirect authenticated users to their respective dashboards
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin" : "/dashboard");
    } else {
      navigate("/signin");
    }
  };

  // Features data
  const features = [
    {
      icon: FileText,
      title: "Easy Submission",
      description: "Submit your complaints and grievances with a simple form in minutes"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track the status of your complaints in real-time with detailed updates"
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Communicate directly with administrators handling your complaints"
    },
    {
      icon: CheckCircle,
      title: "Quick Resolution",
      description: "Get faster resolution through our streamlined management process"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Receive notifications when there are updates to your complaints"
    },
    {
      icon: ShieldCheck,
      title: "Privacy Protection",
      description: "Your personal information is secure and only shared with relevant authorities"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "The complaint system made it so easy to report an issue with our department facilities. It was resolved within days!",
      author: "Maya S., Computer Science"
    },
    {
      quote: "I was able to track the progress of my complaint at every step. The transparency of this system is impressive.",
      author: "Rahul K., Electrical Engineering"
    },
    {
      quote: "As a department head, this system helps me manage and address student concerns in an organized and timely manner.",
      author: "Dr. Sharma, Department of Physics"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="bg-gradient-to-b from-white to-secondary/50 dark:from-background dark:to-background/90 pt-6">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-semibold">Complaint Management System</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button asChild>
                  <Link to={isAdmin ? "/admin" : "/dashboard"}>
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-4">
              Voice Your Concerns, <span className="text-primary">Track Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A modern platform for students to submit complaints and track their resolution. Simple, transparent, and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="College students working together" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features section */}
      <section className="py-16 md:py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Features Designed for Students
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our system is built with you in mind, making it easy to submit and track your complaints while ensuring they reach the right departments.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`glass-card p-6 rounded-xl transition-all duration-300 ${hoveredFeature === index ? 'shadow-md scale-[1.02]' : 'shadow-sm'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-primary/10 text-primary`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What Students Are Saying
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Hear from students and staff who have used our complaint management system.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <svg 
                  className="w-8 h-8 text-primary/30 mb-4" 
                  fill="currentColor" 
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                </svg>
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <p className="text-md text-primary font-medium">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/20 dark:from-background dark:to-background/80">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join other students who are already using the system to voice their concerns and see real changes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" onClick={handleGetStarted}>
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-background py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FileText className="h-5 w-5 text-primary" />
              <span className="ml-2 font-medium">College Complaint Management System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} College Complaint Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
