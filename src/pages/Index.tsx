
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Submit Complaints",
    description: "Easily submit and track your complaints with our intuitive interface.",
    icon: MessageSquare,
  },
  {
    title: "Real-time Updates",
    description: "Get instant notifications about the status of your complaints.",
    icon: CheckCircle,
  },
  {
    title: "Track Progress",
    description: "Monitor the progress of your complaints through our dashboard.",
    icon: CheckCircle,
  },
];

const testimonials = [
  {
    quote: "ComplainHub made it so easy to report issues on campus. I got a response within 24 hours!",
    author: "Sarah T., Computer Science",
  },
  {
    quote: "The tracking system is incredibly helpful. I always know exactly what's happening with my requests.",
    author: "Michael R., Engineering",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/20">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ComplainHub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">Student Login</Link>
              <Link to="/admin/signin">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-6 text-muted-foreground">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Student-Focused Platform
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Campus Voice: <span className="text-primary">Simplified</span> Complaint Management
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Student using complaint platform"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <p className="text-lg font-medium">Empowering students with a voice</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-full shadow-lg animate-float">
                <Shield className="h-6 w-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card p-3 rounded-full shadow-lg border border-border animate-float" style={{ animationDelay: "1s" }}>
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How ComplainHub Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform streamlines the complaint management process for both students and administrators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-gradient p-6 rounded-xl border border-border shadow-md"
              >
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students who have used ComplainHub to resolve their campus issues.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <p className="text-lg mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-right text-muted-foreground">&mdash; {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Join ComplainHub today and make your voice heard on campus issues.
            </p>
            <Link to="/signup">
              <Button size="lg" className="rounded-full">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold">ComplainHub - College Complaint Management System</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ComplainHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
