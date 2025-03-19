
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  UserCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Lock, 
  Bell, 
  Upload,
  Plus,
  Check,
  Trash2,
  Leaf
} from 'lucide-react';

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data
  const mockUserData = {
    name: 'John Farmer',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Farm Lane',
    city: 'Agritown',
    state: 'California',
    country: 'USA',
    bio: 'Third-generation farmer specializing in organic vegetables and sustainable farming practices.',
    userType: 'farmer',
    memberSince: 'January 2022',
    crops: ['Wheat', 'Corn', 'Soybeans', 'Tomatoes'],
    farmSize: '120 acres',
    certification: 'Organic Certified',
  };
  
  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUserData,
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    console.log('Form data:', data);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">My Profile</h1>
            <p className="text-muted-foreground">
              View and manage your personal information
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt={mockUserData.name} />
                    <AvatarFallback>{mockUserData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-1">{mockUserData.name}</h2>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-3">
                    {mockUserData.userType === 'farmer' ? 'Farmer' : 'Buyer'}
                  </Badge>
                  <div className="text-sm text-muted-foreground flex items-center mb-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{`${mockUserData.city}, ${mockUserData.state}`}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Member since {mockUserData.memberSince}
                  </div>
                  <Button variant="outline" className="w-full mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Update Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Farm Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Farm Size</div>
                  <div className="text-sm font-medium flex items-center">
                    <Leaf className="h-3 w-3 mr-1 text-primary" />
                    {mockUserData.farmSize}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Certification</div>
                  <div className="text-sm font-medium flex items-center">
                    <Check className="h-3 w-3 mr-1 text-primary" />
                    {mockUserData.certification}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Crops</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mockUserData.crops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs bg-muted/50">
                      <Plus className="h-3 w-3" />
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="text-xs sm:text-sm">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm">
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="payments" className="text-xs sm:text-sm">
                  Payments
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information
                        </CardDescription>
                      </div>
                      {!isEditing && (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            {...register('name')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            {...register('phone')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            {...register('address')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.address && (
                            <p className="text-xs text-destructive">{errors.address.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            {...register('city')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.city && (
                            <p className="text-xs text-destructive">{errors.city.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            {...register('state')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.state && (
                            <p className="text-xs text-destructive">{errors.state.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            {...register('country')}
                            readOnly={!isEditing}
                            className={!isEditing ? 'bg-muted/50' : ''}
                          />
                          {errors.country && (
                            <p className="text-xs text-destructive">{errors.country.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-6">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          {...register('bio')}
                          readOnly={!isEditing}
                          className={!isEditing ? 'bg-muted/50 resize-none' : 'resize-none'}
                          rows={4}
                        />
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end gap-3 mt-6">
                          <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={!isDirty}>
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button>Update Password</Button>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable two-factor authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-4">Sessions</h3>
                        <div className="space-y-4">
                          <div className="bg-muted/40 p-3 rounded-md flex justify-between items-center">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-xs text-muted-foreground">
                                MacBook Pro - California, USA
                              </p>
                            </div>
                            <Badge variant="outline">Active Now</Badge>
                          </div>
                          <div className="bg-muted/40 p-3 rounded-md flex justify-between items-center">
                            <div>
                              <p className="font-medium">Mobile App</p>
                              <p className="text-xs text-muted-foreground">
                                iPhone 13 - Last active 2 days ago
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Contract Updates</p>
                              <p className="text-sm text-muted-foreground">
                                Receive emails when there are updates to your contracts
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Payment Confirmations</p>
                              <p className="text-sm text-muted-foreground">
                                Receive emails for payment confirmations
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">New Contract Opportunities</p>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about new potential contracts
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Marketing Emails</p>
                              <p className="text-sm text-muted-foreground">
                                Receive promotional content and updates
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Mobile Push Notifications</p>
                              <p className="text-sm text-muted-foreground">
                                Enable push notifications on your mobile device
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Browser Notifications</p>
                              <p className="text-sm text-muted-foreground">
                                Enable desktop notifications in your browser
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Payments Tab */}
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and transaction history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Payment Methods</h3>
                          <Button variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-start gap-3">
                              <CreditCard className="h-6 w-6 text-primary mt-1" />
                              <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>
                          
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-start gap-3">
                              <CreditCard className="h-6 w-6 text-primary mt-1" />
                              <div>
                                <p className="font-medium">Mastercard ending in 8888</p>
                                <p className="text-sm text-muted-foreground">Expires 09/2024</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-4">Transaction History</h3>
                        <ScrollArea className="h-[300px]">
                          <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium">Contract Payment - Wheat Supply</p>
                                    <p className="text-sm text-muted-foreground">
                                      August {10 - i}, 2023
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-green-600">+$3,{750 - i * 100}</p>
                                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                      Completed
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Transaction ID: TXN-{234567 + i}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
