
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define user types and roles
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string, studentId: string, department: string) => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  sendNotificationEmail: (subject: string, message: string, email?: string) => Promise<boolean>;
}

// Mock user data (would be replaced with actual API calls in production)
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'student@college.edu',
    name: 'John Student',
    role: 'student',
    studentId: 'STU1234',
    department: 'Computer Science'
  },
  {
    id: '2',
    email: 'admin@college.edu',
    name: 'Admin User',
    role: 'admin',
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email (in a real app, this would validate the password too)
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid email or password.');
        return false;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An error occurred during sign in.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign up function
  const signUp = async (
    email: string, 
    password: string, 
    name: string, 
    studentId: string, 
    department: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error('An account with this email already exists.');
        return false;
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        email,
        name,
        role: 'student',
        studentId,
        department
      };
      
      // Add to mock users (in a real app, this would be persisted to a database)
      MOCK_USERS.push(newUser);
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An error occurred during sign up.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock email notification function
  const sendNotificationEmail = async (subject: string, message: string, email?: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Log the email that would be sent in a real app
      console.log(`Email sent: 
        To: ${email || user?.email}
        Subject: ${subject}
        Message: ${message}
      `);
      
      // In a real app, this would call an API endpoint to send the email
      return true;
    } catch (error) {
      console.error('Email notification error:', error);
      return false;
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('You have been signed out.');
  };

  // Computed properties
  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role === 'admin';

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    isAdmin,
    sendNotificationEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
