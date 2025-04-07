
import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Lock, 
  Mail, 
  Settings, 
  MessageSquare, 
  AlertTriangle, 
  Shield 
} from "lucide-react";

const AdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBlockUsers, setAutoBlockUsers] = useState(false);
  const [automaticPriority, setAutomaticPriority] = useState(true);
  const [mlEndpoint, setMlEndpoint] = useState("https://api.university.edu/ml/priority");

  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved successfully");
  };

  const handleSaveSecuritySettings = () => {
    toast.success("Security settings saved successfully");
  };

  const handleSaveMLSettings = () => {
    toast.success("ML settings saved successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid grid-cols-4 max-w-2xl">
              <TabsTrigger value="general">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Mail className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="ml">
                <Shield className="h-4 w-4 mr-2" />
                ML Integration
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input id="systemName" defaultValue="College Complaint Management System" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Support Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="support@university.edu" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerText">Footer Text</Label>
                    <Input id="footerText" defaultValue="© 2025 University Complaint System" />
                  </div>
                  
                  <Button onClick={handleSaveGeneralSettings}>
                    Save General Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for new complaints
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailTemplate">Email Template</Label>
                    <Textarea 
                      id="emailTemplate" 
                      rows={5}
                      defaultValue="Dear [Admin],\n\nA new complaint has been submitted.\n\nComplaint ID: [ID]\nTitle: [Title]\nSubmitted by: [Student]\n\nPlease review it at your earliest convenience."
                    />
                  </div>
                  
                  <Button onClick={handleSaveNotificationSettings}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Block Flagged Users</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically block users with multiple flagged complaints
                      </p>
                    </div>
                    <Switch 
                      checked={autoBlockUsers} 
                      onCheckedChange={setAutoBlockUsers}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flagThreshold">Flag Threshold</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="flagThreshold" 
                        type="number" 
                        defaultValue="3"
                        min="1"
                        max="10"
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">flagged complaints</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="flaggedWords">Flagged Words/Phrases</Label>
                    <Textarea 
                      id="flaggedWords" 
                      rows={3}
                      placeholder="Enter words or phrases separated by commas"
                      defaultValue="violence, threat, harassment, abuse, attack"
                    />
                    <p className="text-sm text-muted-foreground">
                      Complaints containing these words will be flagged for review
                    </p>
                  </div>
                  
                  <Button onClick={handleSaveSecuritySettings}>
                    Save Security Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ML Settings */}
            <TabsContent value="ml">
              <Card>
                <CardHeader>
                  <CardTitle>ML Integration Settings</CardTitle>
                  <CardDescription>Configure machine learning integration for priority prediction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Priority Assignment</Label>
                      <p className="text-sm text-muted-foreground">
                        Use ML to automatically assign priority to new complaints
                      </p>
                    </div>
                    <Switch 
                      checked={automaticPriority} 
                      onCheckedChange={setAutomaticPriority}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mlEndpoint">ML API Endpoint</Label>
                    <Input 
                      id="mlEndpoint" 
                      value={mlEndpoint}
                      onChange={(e) => setMlEndpoint(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Endpoint for the ML service that predicts complaint priority
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-amber-50 border-amber-200 text-amber-800 flex gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">ML Integration Note</p>
                      <p>The ML model will analyze complaint text and assign priority based on historical data patterns. Ensure your ML service is properly trained with university-specific complaint data.</p>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveMLSettings}>
                    Save ML Settings
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

export default AdminSettings;
