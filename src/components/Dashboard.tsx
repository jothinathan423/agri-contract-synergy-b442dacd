
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, CircleDollarSign, TrendingUp, FileText, AlertTriangle } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardProps {
  userType: 'farmer' | 'buyer';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  // Mock data for charts
  const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];
  
  const cropData = [
    { name: 'Wheat', value: 35 },
    { name: 'Rice', value: 25 },
    { name: 'Corn', value: 20 },
    { name: 'Soybeans', value: 15 },
    { name: 'Others', value: 5 },
  ];
  
  const contractStatusData = [
    { name: 'Active', value: 12 },
    { name: 'Pending', value: 5 },
    { name: 'Completed', value: 8 },
    { name: 'Dispute', value: 2 },
  ];
  
  const deliveryTimelineData = [
    { name: 'Week 1', completed: 4, pending: 2 },
    { name: 'Week 2', completed: 3, pending: 3 },
    { name: 'Week 3', completed: 2, pending: 4 },
    { name: 'Week 4', completed: 1, pending: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const STATUS_COLORS = ['#10B981', '#FBBF24', '#3B82F6', '#F97316'];
  
  // Quick stats data
  const farmerStats = [
    { 
      title: 'Active Contracts', 
      value: '8', 
      change: '+2 from last month',
      trend: 'up',
      icon: <FileText className="h-4 w-4 text-emerald-500" />
    },
    { 
      title: 'Total Revenue', 
      value: '$24,560', 
      change: '+12% from last year',
      trend: 'up',
      icon: <CircleDollarSign className="h-4 w-4 text-emerald-500" />
    },
    { 
      title: 'Upcoming Deliveries', 
      value: '3', 
      change: 'Next: Jun 15',
      trend: 'neutral',
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    { 
      title: 'Disputes', 
      value: '1', 
      change: 'Action required',
      trend: 'down',
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />
    },
  ];
  
  const buyerStats = [
    { 
      title: 'Active Contracts', 
      value: '15', 
      change: '+4 from last month',
      trend: 'up',
      icon: <FileText className="h-4 w-4 text-emerald-500" />
    },
    { 
      title: 'Total Spending', 
      value: '$78,230', 
      change: '+8% from last year',
      trend: 'up',
      icon: <CircleDollarSign className="h-4 w-4 text-emerald-500" />
    },
    { 
      title: 'Expected Deliveries', 
      value: '7', 
      change: 'Next: Jun 12',
      trend: 'neutral',
      icon: <Calendar className="h-4 w-4 text-blue-500" />
    },
    { 
      title: 'Quality Issues', 
      value: '2', 
      change: 'Action required',
      trend: 'down',
      icon: <AlertTriangle className="h-4 w-4 text-orange-500" />
    },
  ];
  
  const stats = userType === 'farmer' ? farmerStats : buyerStats;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' 
                  ? 'text-emerald-500' 
                  : stat.trend === 'down' 
                    ? 'text-red-500' 
                    : 'text-muted-foreground'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="inline mr-1 h-3 w-3" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  {userType === 'farmer' ? 'Performance Overview' : 'Supply Procurement'}
                </CardTitle>
                <CardDescription>
                  {userType === 'farmer' 
                    ? 'Monthly yield and revenue metrics' 
                    : 'Monthly procurement and expenditure'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  {userType === 'farmer' ? 'Crop Distribution' : 'Product Categories'}
                </CardTitle>
                <CardDescription>
                  Breakdown by {userType === 'farmer' ? 'crop type' : 'product category'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {cropData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Contract Status</CardTitle>
                <CardDescription>
                  Distribution of contracts by their current status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contractStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {contractStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
                <CardDescription>
                  Projected vs completed deliveries by week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deliveryTimelineData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="a" fill="#10B981" />
                    <Bar dataKey="pending" stackId="a" fill="#FBBF24" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="h-96 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-4">Detailed analysis tools will appear here.</p>
            <Button variant="outline">Generate Report</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="h-96 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Reports & Documents</h3>
            <p className="text-muted-foreground mb-4">Your saved and generated reports will appear here.</p>
            <Button variant="outline">Create New Report</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
              <div className="flex-1">
                <p className="text-sm font-medium">Contract #102 Approved</p>
                <p className="text-xs text-muted-foreground mt-1">Wheat Supply Agreement with GrainCorp Inc.</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">
                View
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
              <div className="flex-1">
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-muted-foreground mt-1">$3,450 for Rice Cultivation Contract</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
              <Button variant="outline" size="sm">
                View
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
              <div className="flex-1">
                <p className="text-sm font-medium">New Contract Offer</p>
                <p className="text-xs text-muted-foreground mt-1">Organic Tomatoes Supply from Fresh Foods Ltd.</p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
              <Button variant="outline" size="sm">
                View
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
