
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Ban, CheckCircle, Search, User } from "lucide-react";

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@university.edu",
    studentId: "ST20210001",
    department: "Computer Science",
    status: "active",
    profileImage: null,
    flaggedComplaints: 0,
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.j@university.edu",
    studentId: "ST20210015",
    department: "Electrical Engineering",
    status: "active",
    profileImage: null,
    flaggedComplaints: 1,
  },
  {
    id: "3",
    name: "Michael Wong",
    email: "m.wong@university.edu",
    studentId: "ST20210042",
    department: "Civil Engineering",
    status: "active",
    profileImage: null,
    flaggedComplaints: 0,
  },
  {
    id: "4",
    name: "Sarah Miller",
    email: "sarah.m@university.edu",
    studentId: "ST20210078",
    department: "Business Administration",
    status: "blocked",
    profileImage: null,
    flaggedComplaints: 3,
  },
  {
    id: "5",
    name: "David Chen",
    email: "d.chen@university.edu",
    studentId: "ST20210103",
    department: "Computer Science",
    status: "active", 
    profileImage: null,
    flaggedComplaints: 0,
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(MOCK_USERS);
        setFilteredUsers(MOCK_USERS);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = users.filter(user => 
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        user.studentId.toLowerCase().includes(lowercasedQuery) ||
        user.department.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredUsers(results);
    }
  }, [searchQuery, users]);

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "blocked" } : user
    ));
    setFilteredUsers(filteredUsers.map(user => 
      user.id === userId ? { ...user, status: "blocked" } : user
    ));
    toast.success("User has been blocked");
  };

  const handleUnblockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "active" } : user
    ));
    setFilteredUsers(filteredUsers.map(user => 
      user.id === userId ? { ...user, status: "active" } : user
    ));
    toast.success("User has been unblocked");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>View and manage all users in the system</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-muted rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Flagged Content</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  {user.profileImage ? (
                                    <AvatarImage src={user.profileImage} alt={user.name} />
                                  ) : (
                                    <AvatarFallback>
                                      {user.name.charAt(0)}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.studentId}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                              {user.status === "active" ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  Blocked
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {user.flaggedComplaints > 0 ? (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  {user.flaggedComplaints} {user.flaggedComplaints === 1 ? 'complaint' : 'complaints'}
                                </Badge>
                              ) : (
                                <span className="text-sm text-muted-foreground">None</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {user.status === "active" ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                      <Ban className="h-4 w-4 mr-1" />
                                      Block
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Block User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to block {user.name}? They will no longer be able to log in or submit complaints.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleBlockUser(user.id)} className="bg-red-600 hover:bg-red-700">
                                        Block User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleUnblockUser(user.id)}>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Unblock
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <User className="h-8 w-8 mb-2" />
                              <p>No users found</p>
                              <p className="text-sm">Try adjusting your search</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
