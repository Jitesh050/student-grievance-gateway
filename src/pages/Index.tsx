
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Shield, ArrowRight, CheckCircle, MessageSquare, Sparkles, Zap, Users } from "lucide-react";

const features = [
  {
    title: "Smart Complaint Tracking",
    description: "AI-powered categorization and priority assignment for faster resolution.",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Real-time Notifications",
    description: "Instant updates on complaint status with email and in-app notifications.",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "Collaborative Resolution",
    description: "Seamless communication between students and administrators.",
    icon: Users,
    gradient: "from-purple-500 to-pink-400",
  },
];

const testimonials = [
  {
    quote: "ComplainHub transformed how we handle student grievances. The interface is intuitive and responses are lightning fast!",
    author: "Sarah Mitchell",
    role: "Computer Science Student",
    avatar: "SM",
  },
  {
    quote: "As an administrator, this platform has streamlined our complaint management process incredibly. Highly recommended!",
    author: "Dr. Michael Roberts",
    role: "Academic Administrator", 
    avatar: "MR",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background relative overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 animate-pulse-soft"></div>
      
      {/* Header */}
      <header className="glass-surface sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="glow-effect">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <span className="gradient-text text-xl font-bold">ComplainHub</span>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">
                Student Login
              </Link>
              <Link to="/admin/signin">
                <Button variant="outline" size="sm" className="glass-button">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center glass-surface rounded-full px-4 py-2 text-sm mb-8 border"
              >
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="gradient-text font-medium">Next-Generation Platform</span>
              </motion.div>
              
              <h1 className="text-display mb-8 leading-tight">
                Campus Voice: <span className="gradient-text">Reimagined</span> 
                <br />Complaint Management
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Experience the future of student grievance handling with our AI-powered, 
                intuitive platform designed for modern campuses.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/signin">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/admin/signin">
                  <Button variant="outline" size="lg" className="glass-button rounded-full px-8 py-6 text-lg font-medium">
                    Admin Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="glass-card rounded-3xl overflow-hidden p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Modern campus collaboration"
                  className="w-full h-full object-cover aspect-[4/3] rounded-2xl"
                />
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass-surface p-4 rounded-2xl border shadow-lg"
                >
                  <Shield className="h-8 w-8 text-primary" />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 glass-surface p-4 rounded-2xl border shadow-lg"
                >
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-headline mb-6">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver exceptional user experience 
              and efficient complaint resolution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass-card p-8 rounded-3xl border hover:shadow-2xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`bg-gradient-to-r ${feature.gradient} text-white rounded-2xl w-16 h-16 flex items-center justify-center mb-6 relative z-10`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-title mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-headline mb-6">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from students and administrators who use ComplainHub daily.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-8 rounded-3xl border hover:shadow-2xl transition-all duration-500">
                  <p className="text-lg mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-caption">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-16 text-center border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10"></div>
            
            <h2 className="text-headline mb-6 relative z-10">Ready to Transform Your Campus?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of students and administrators already using ComplainHub 
              to create a better campus experience.
            </p>
            
            <div className="relative z-10">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 rounded-full px-12 py-6 text-lg font-medium shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 glass-surface border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="gradient-text font-bold text-lg">ComplainHub</span>
            </div>
            <p className="text-caption">
              © 2025 ComplainHub. Empowering campus voices worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
