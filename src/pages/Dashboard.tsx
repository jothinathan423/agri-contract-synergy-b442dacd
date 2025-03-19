
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Truck, MessageSquare, Settings, Plus } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // This would check the actual auth state
  const [userType, setUserType] = React.useState<'farmer' | 'buyer'>('farmer');
  
  // Redirect to home if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  
  // This would fetch user data in a real application
  useEffect(() => {
    // Simulate API call to get user data
    setTimeout(() => {
      console.log('User data fetched');
      // setUserType(userData.type);
    }, 1000);
  }, []);
  
  if (!isLoggedIn) {
    return null; // Will redirect
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your contracts, track progress, and monitor performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>New Contract</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-md text-primary">
                    <FileText size={16} />
                    <span className="font-medium">Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <FileText size={16} />
                    <span>Contracts</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Users size={16} />
                    <span>{userType === 'farmer' ? 'Buyers' : 'Farmers'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Truck size={16} />
                    <span>Deliveries</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <MessageSquare size={16} />
                    <span>Messages</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Settings size={16} />
                    <span>Settings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="farmer" value={userType} onValueChange={(value) => setUserType(value as 'farmer' | 'buyer')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="farmer">Farmer</TabsTrigger>
                    <TabsTrigger value="buyer">Buyer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="farmer">
                    <p className="text-xs text-muted-foreground mt-2">
                      You're viewing the dashboard as a farmer. Switch to buyer view to see how buyers interact with the platform.
                    </p>
                  </TabsContent>
                  <TabsContent value="buyer">
                    <p className="text-xs text-muted-foreground mt-2">
                      You're viewing the dashboard as a buyer. Switch to farmer view to see how farmers interact with the platform.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Dashboard userType={userType} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
