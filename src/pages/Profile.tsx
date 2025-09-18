import { useState } from "react";
import { User, Camera, Save, Plus, X, Edit2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CustomField {
  id: number;
  label: string;
  value: string;
  type: "text" | "textarea" | "select";
  options?: string[];
}

const initialProfile = {
  fullName: "Dr. Sarah Johnson",
  email: "sarah.johnson@schoolhub.edu",
  contact: "+1 (555) 123-4567",
  qualification: "Ph.D. in Educational Psychology",
  workExperience: "15 years in academic counseling and student development",
  worksDone: "Led multiple student success initiatives, published research on student retention strategies, mentored over 500 students",
  profileImage: "/placeholder.svg"
};

const initialCustomFields: CustomField[] = [
  {
    id: 1,
    label: "Specialization",
    value: "Academic Counseling, Career Guidance",
    type: "text"
  },
  {
    id: 2,
    label: "Office Hours",
    value: "Monday-Friday: 9:00 AM - 5:00 PM",
    type: "text"
  },
  {
    id: 3,
    label: "Languages Spoken",
    value: "English, Spanish, French",
    type: "text"
  }
];

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [customFields, setCustomFields] = useState<CustomField[]>(initialCustomFields);
  const [isEditing, setIsEditing] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<"text" | "textarea" | "select">("text");
  const [isAddingField, setIsAddingField] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    }, 1000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a service
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image Uploaded",
        description: "Profile picture has been updated.",
      });
    }
  };

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return;
    
    const newField: CustomField = {
      id: Date.now(),
      label: newFieldLabel,
      value: "",
      type: newFieldType
    };
    
    setCustomFields(prev => [...prev, newField]);
    setNewFieldLabel("");
    setNewFieldType("text");
    setIsAddingField(false);
    
    toast({
      title: "Field Added",
      description: "New custom field has been added to your profile.",
    });
  };

  const removeCustomField = (id: number) => {
    setCustomFields(prev => prev.filter(field => field.id !== id));
    toast({
      title: "Field Removed",
      description: "Custom field has been removed from your profile.",
    });
  };

  const updateCustomField = (id: number, value: string) => {
    setCustomFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, value } : field
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
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
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.profileImage} alt={profile.fullName} />
              <AvatarFallback className="text-2xl">
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            
            {isEditing && (
              <div className="space-y-2 w-full">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 p-2 border-2 border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <Camera className="h-4 w-4" />
                    <span className="text-sm">Upload New Photo</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground text-center">
                  Supports JPG, PNG files from device, Google Photos, or Google Drive
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your personal and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={profile.contact}
                  onChange={(e) => setProfile(prev => ({ ...prev, contact: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={profile.qualification}
                  onChange={(e) => setProfile(prev => ({ ...prev, qualification: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="workExperience">Work Experience</Label>
              <Textarea
                id="workExperience"
                value={profile.workExperience}
                onChange={(e) => setProfile(prev => ({ ...prev, workExperience: e.target.value }))}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="worksDone">Works Done</Label>
              <Textarea
                id="worksDone"
                value={profile.worksDone}
                onChange={(e) => setProfile(prev => ({ ...prev, worksDone: e.target.value }))}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Fields */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Custom Fields</CardTitle>
              <CardDescription>Add additional information fields as needed</CardDescription>
            </div>
            {isEditing && (
              <Dialog open={isAddingField} onOpenChange={setIsAddingField}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Field</DialogTitle>
                    <DialogDescription>
                      Create a new custom field for your profile
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fieldLabel">Field Label</Label>
                      <Input
                        id="fieldLabel"
                        value={newFieldLabel}
                        onChange={(e) => setNewFieldLabel(e.target.value)}
                        placeholder="e.g., Research Interests"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fieldType">Field Type</Label>
                      <Select value={newFieldType} onValueChange={(value: any) => setNewFieldType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingField(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addCustomField}>
                        Add Field
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customFields.map((field) => (
              <div key={field.id} className="flex items-start gap-4">
                <div className="flex-1">
                  <Label htmlFor={`custom-${field.id}`}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`custom-${field.id}`}
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={`custom-${field.id}`}
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, e.target.value)}
                      disabled={!isEditing}
                    />
                  )}
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCustomField(field.id)}
                    className="mt-6 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {customFields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No custom fields added yet.</p>
                {isEditing && (
                  <p className="text-sm">Click "Add Field" to create custom profile fields.</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">250+</div>
              <div className="text-sm text-muted-foreground">Students Counseled</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">15</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">12</div>
              <div className="text-sm text-muted-foreground">Research Papers</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}