
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  Shield, 
  ArrowRight, 
  Clock as ClockIcon, 
  CheckCircle, 
  BookOpen as BookOpenIcon, 
  Flag as FlagIcon,
  MessageSquare,
  BarChart3,
  Bell
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="relative"
  >
    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
      <span className="text-xl font-bold text-primary-foreground">
        {testimonial.name.charAt(0)}
      </span>
    </div>
    <Card className="overflow-hidden border-none rounded-xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 h-full pl-6">
      <CardContent className="p-6 pt-8">
        <div className="flex flex-col space-y-4">
          <div>
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className="text-sm text-primary/70 dark:text-primary/80">{testimonial.department}</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base">"{testimonial.comment}"</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 * index }}
    className="relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
    <Card className="h-full border-none bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-3 w-fit mb-5">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StatsCard = ({ icon: Icon, title, value }) => (
  <Card className="border-none shadow-md bg-white dark:bg-gray-800 overflow-hidden">
    <div className="absolute top-0 right-0 h-full w-1 bg-primary"></div>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
        </div>
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
              <Link to={dashboardLink}>
                <Button size="sm" className="rounded-full">
                  {user ? "Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
                    <FileText className="mr-2 h-5 w-5" />
                    Student Portal
                  </Button>
                </Link>
                <Link to="/admin/signin">
                  <Button variant="outline" size="lg" className="rounded-full">
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Access
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                <StatsCard icon={FileText} title="Total Complaints" value="1,234+" />
                <StatsCard icon={CheckCircle} title="Resolved Issues" value="92%" />
                <StatsCard icon={ClockIcon} title="Avg. Response" value="24h" />
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
              
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Rapid Resolution</p>
                    <p className="text-xs text-muted-foreground">92% resolved within 72hrs</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-5 right-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Real-time Updates</p>
                    <p className="text-xs text-muted-foreground">Instant notifications</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Streamlined Features for All Users</h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines powerful tools with an intuitive interface
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="sticky top-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What Students Are Saying</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Real feedback from campus users who have experienced the difference.
                </p>
                <Button className="rounded-full" variant="outline">
                  View Success Stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Improve Campus Life?</h2>
              <p className="text-xl opacity-90 mb-0">
                Join the platform that empowers students and administrators alike.
              </p>
            </div>
            <div>
              <Link to={dashboardLink}>
                <Button size="lg" variant="secondary" className="rounded-full">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">CMS</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empowering campus communities through effective complaint management.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/signin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Student Login</Link></li>
                <li><Link to="/admin/signin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">support@cms.edu</li>
                <li className="text-sm text-muted-foreground">+1 (555) 123-4567</li>
                <li className="text-sm text-muted-foreground">123 Campus Drive</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 College Complaint Management System. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature list for the features section
const features = [
  {
    title: "User-Friendly Submission",
    description: "Intuitive complaint forms with smart categorization for faster processing",
    icon: FileText,
  },
  {
    title: "Real-time Tracking",
    description: "Follow your complaint's journey from submission to resolution",
    icon: ClockIcon,
  },
  {
    title: "Instant Notifications",
    description: "Get timely updates on status changes and administrative responses",
    icon: Bell,
  },
  {
    title: "Secure Communication",
    description: "Private messaging channel between students and administrators",
    icon: MessageSquare,
  },
  {
    title: "Comprehensive Dashboard",
    description: "All-in-one view of your active and resolved complaints",
    icon: BarChart3,
  },
  {
    title: "Priority Handling",
    description: "Critical issues receive expedited attention and resolution",
    icon: FlagIcon,
  },
];

// Testimonial data
const testimonials = [
  {
    name: "Alex Johnson",
    department: "Computer Science",
    comment: "The new platform has transformed how we report issues. I got a response within hours and my dormitory Wi-Fi was fixed the next day!"
  },
  {
    name: "Priya Sharma",
    department: "Business Administration",
    comment: "Having the ability to track my complaint status in real-time gives me peace of mind. The interface is intuitive and user-friendly."
  },
  {
    name: "Michael Chen",
    department: "Engineering",
    comment: "Since the introduction of this system, there's been a notable improvement in how quickly maintenance issues get addressed."
  },
  {
    name: "Sophia Williams",
    department: "Psychology",
    comment: "The secure messaging feature lets me communicate with staff without endless emails or visits to different offices."
  }
];

export default Index;
