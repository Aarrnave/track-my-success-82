import { useState } from "react";
import { User, Bell, Calendar, Lock, Palette, Globe, Save, Camera, Edit2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface CounselorProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  specialization: string[];
  bio: string;
  officeHours: {
    start: string;
    end: string;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  sessionReminders: boolean;
  riskAlerts: boolean;
  systemUpdates: boolean;
  reportDeadlines: boolean;
}

export default function CounselorSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState<CounselorProfile>({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@schoolhub.edu",
    phone: "+1 (555) 123-4567",
    qualification: "M.Phil in Educational Psychology",
    experience: "8 years",
    specialization: ["Academic Counseling", "Career Guidance", "Stress Management"],
    bio: "Dedicated educational counselor with extensive experience in student support and mental health advocacy.",
    officeHours: {
      start: "09:00",
      end: "17:00"
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    sessionReminders: true,
    riskAlerts: true,
    systemUpdates: true,
    reportDeadlines: true
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    sessionDuration: "45"
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences updated successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "availability", label: "Availability", icon: Calendar },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "security", label: "Security", icon: Lock }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage your profile, preferences, and system configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="chart-container p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "profile" && (
            <ProfileSettings profile={profile} setProfile={setProfile} onSave={handleSaveProfile} />
          )}
          {activeTab === "notifications" && (
            <NotificationSettings 
              notifications={notifications} 
              setNotifications={setNotifications} 
              onSave={handleSaveNotifications} 
            />
          )}
          {activeTab === "availability" && (
            <AvailabilitySettings profile={profile} setProfile={setProfile} onSave={handleSaveProfile} />
          )}
          {activeTab === "preferences" && (
            <PreferenceSettings 
              preferences={preferences} 
              setPreferences={setPreferences} 
              onSave={handleSavePreferences} 
            />
          )}
          {activeTab === "security" && (
            <SecuritySettings />
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ profile, setProfile, onSave }: {
  profile: CounselorProfile;
  setProfile: (profile: CounselorProfile) => void;
  onSave: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave();
    setIsEditing(false);
    alert("Profile changes saved successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    alert("Changes cancelled.");
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Profile Picture
          </CardTitle>
          <CardDescription>
            Upload and manage your profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src="/placeholder.svg" alt={`${profile.firstName} ${profile.lastName}`} />
            <AvatarFallback className="text-2xl">
              {profile.firstName[0]}{profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="outline" 
            size="sm"
            className="btn-white-hover hover:bg-accent-redorange hover:text-white transition-colors"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    // Preview image logic here
                    toast.success("Profile picture updated!");
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Picture
          </Button>
        </CardContent>
      </div>

      <div className="chart-container">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and professional information
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              value={profile.qualification}
              onChange={(e) => setProfile({...profile, qualification: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              value={profile.experience}
              onChange={(e) => setProfile({...profile, experience: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>Specializations</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.specialization.map((spec, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {spec}
                  <button
                    onClick={() => {
                      const newSpecs = profile.specialization.filter((_, i) => i !== index);
                      setProfile({...profile, specialization: newSpecs});
                    }}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add specialization"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value && !profile.specialization.includes(value)) {
                    setProfile({...profile, specialization: [...profile.specialization, value]});
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </div>
    </div>
  );
}

function NotificationSettings({ notifications, setNotifications, onSave }: {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Delivery Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, emailNotifications: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, smsNotifications: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, pushNotifications: checked})
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Notification Types</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Reminders</Label>
                  <p className="text-sm text-muted-foreground">Upcoming counseling sessions</p>
                </div>
                <Switch
                  checked={notifications.sessionReminders}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, sessionReminders: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Risk Alerts</Label>
                  <p className="text-sm text-muted-foreground">High-risk student notifications</p>
                </div>
                <Switch
                  checked={notifications.riskAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, riskAlerts: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">Platform updates and maintenance</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, systemUpdates: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Report Deadlines</Label>
                  <p className="text-sm text-muted-foreground">Report submission reminders</p>
                </div>
                <Switch
                  checked={notifications.reportDeadlines}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, reportDeadlines: checked})
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="btn-white-hover">
              Edit
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
}

function AvailabilitySettings({ profile, setProfile, onSave }: {
  profile: CounselorProfile;
  setProfile: (profile: CounselorProfile) => void;
  onSave: () => void;
}) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="space-y-6">
      <div className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Availability Settings
          </CardTitle>
          <CardDescription>
            Set your office hours and weekly availability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Office Hours</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={profile.officeHours.start}
                  onChange={(e) => setProfile({
                    ...profile, 
                    officeHours: {...profile.officeHours, start: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={profile.officeHours.end}
                  onChange={(e) => setProfile({
                    ...profile, 
                    officeHours: {...profile.officeHours, end: e.target.value}
                  })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Weekly Availability</h4>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day.key} className="flex items-center justify-between">
                  <Label>{day.label}</Label>
                  <Switch
                    checked={profile.availability[day.key as keyof typeof profile.availability]}
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile, 
                        availability: {...profile.availability, [day.key]: checked}
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={onSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Availability
          </Button>
        </CardContent>
      </div>
    </div>
  );
}

function PreferenceSettings({ preferences, setPreferences, onSave }: {
  preferences: any;
  setPreferences: (preferences: any) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            System Preferences
          </CardTitle>
          <CardDescription>
            Customize your interface and system settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="UTC-6">UTC-6 (CST)</SelectItem>
                  <SelectItem value="UTC-7">UTC-7 (MST)</SelectItem>
                  <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({...preferences, dateFormat: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Default Session Duration</Label>
            <Select value={preferences.sessionDuration} onValueChange={(value) => setPreferences({...preferences, sessionDuration: value})}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Preferences
          </Button>
        </CardContent>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <div className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your password and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleChangePassword} className="gap-2">
                  <Lock className="h-4 w-4" />
                  Change Password
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label>Enable 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">
                Enable 2FA
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Active Sessions</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Current Session</div>
                  <div className="text-sm text-muted-foreground">
                    Chrome on Windows • Last active now
                  </div>
                </div>
                <Badge variant="secondary">Current</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Mobile App</div>
                  <div className="text-sm text-muted-foreground">
                    iPhone • Last active 2 hours ago
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}