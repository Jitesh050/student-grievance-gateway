import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ban, CheckCircle, Search, User as UserIcon, AlertTriangle, Shield } from "lucide-react";

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
    blockReason: ""
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
    blockReason: ""
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
    blockReason: ""
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
    blockReason: "Multiple uses of inappropriate language in complaints"
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
    blockReason: ""
  }
];

const FLAGGED_WORDS = [
  "violence", "threat", "kill", "attack", "hate", 
  "harassment", "abuse", "racist", "sexist", "offensive",
  "weapon", "gun", "bomb", "explosive", "fight",
  "assault", "dangerous", "illegal", "inappropriate"
];

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blockReason, setBlockReason] = useState("");
  const [flaggedWords, setFlaggedWords] = useState(FLAGGED_WORDS.join(", "));
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
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
    if (!blockReason.trim()) {
      toast.error("Please provide a reason for blocking this user");
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "blocked", blockReason } : user
    ));
    setFilteredUsers(filteredUsers.map(user => 
      user.id === userId ? { ...user, status: "blocked", blockReason } : user
    ));
    toast.success("User has been blocked");
    setBlockReason("");
    setSelectedUserId(null);
  };

  const handleUnblockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "active", blockReason: "" } : user
    ));
    setFilteredUsers(filteredUsers.map(user => 
      user.id === userId ? { ...user, status: "active", blockReason: "" } : user
    ));
    toast.success("User has been unblocked");
  };

  const handleSaveFlaggedWords = () => {
    const wordsArray = flaggedWords.split(",").map(word => word.trim()).filter(Boolean);
    toast.success("Flagged word list updated successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid grid-cols-2 max-w-md">
              <TabsTrigger value="users">
                <UserIcon className="h-4 w-4 mr-2" />
                All Users
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Shield className="h-4 w-4 mr-2" />
                Content Moderation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
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
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="text-red-600 hover:text-red-700"
                                          onClick={() => setSelectedUserId(user.id)}
                                        >
                                          <Ban className="h-4 w-4 mr-1" />
                                          Block
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Block User</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            <p className="mb-4">
                                              Are you sure you want to block {user.name}? They will no longer be able to log in or submit complaints.
                                            </p>
                                            <div className="space-y-2">
                                              <label className="text-sm font-medium">Reason for blocking:</label>
                                              <Textarea 
                                                value={blockReason}
                                                onChange={(e) => setBlockReason(e.target.value)}
                                                placeholder="Explain why this user is being blocked..."
                                                rows={3}
                                                className="resize-none"
                                              />
                                            </div>
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel onClick={() => setBlockReason("")}>Cancel</AlertDialogCancel>
                                          <AlertDialogAction 
                                            onClick={() => handleBlockUser(user.id)} 
                                            className="bg-red-600 hover:bg-red-700"
                                          >
                                            Block User
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  ) : (
                                    <div className="flex items-center justify-end gap-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-green-600 hover:text-green-700" 
                                        onClick={() => handleUnblockUser(user.id)}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Unblock
                                      </Button>
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-muted-foreground"
                                          >
                                            <AlertTriangle className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Block Reason</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              <p className="mb-2 font-medium">{user.name} was blocked for the following reason:</p>
                                              <p className="p-3 bg-muted rounded-md text-sm">
                                                {user.blockReason || "No specific reason provided"}
                                              </p>
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Close</AlertDialogCancel>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                  <UserIcon className="h-8 w-8 mb-2" />
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
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation Settings</CardTitle>
                  <CardDescription>
                    Configure content moderation and user blocking policies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Flagged Words/Phrases</h3>
                    <p className="text-sm text-muted-foreground">
                      Complaints containing these words will be automatically flagged for review
                    </p>
                    <Textarea 
                      value={flaggedWords} 
                      onChange={(e) => setFlaggedWords(e.target.value)}
                      placeholder="Enter words or phrases separated by commas"
                      rows={6}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter words separated by commas. These words will trigger content warnings.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-amber-50 border-amber-200 text-amber-800 flex gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Auto-Flagging System</p>
                      <p>The system automatically scans complaints for potentially inappropriate content. 
                        Complaints containing flagged words will be marked for review and may affect the user's status.</p>
                    </div>
                  </div>

                  <Button onClick={handleSaveFlaggedWords}>
                    Save Moderation Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
