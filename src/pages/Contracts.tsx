
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ContractCard, { ContractCardProps } from '@/components/ContractCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Filter, 
  Plus, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';

// Mock data
const mockContracts: ContractCardProps[] = [
  {
    id: '1',
    title: 'Wheat Supply Agreement',
    crop: 'Wheat',
    quantity: '5,000 kg',
    price: '$0.40/kg',
    deadline: 'Sep 30, 2023',
    status: 'active',
    counterparty: 'GrainCorp Inc.',
    counterpartyType: 'buyer',
  },
  {
    id: '2',
    title: 'Organic Tomatoes Supply',
    crop: 'Tomatoes',
    quantity: '2,000 kg',
    price: '$1.20/kg',
    deadline: 'Aug 15, 2023',
    status: 'pending',
    counterparty: 'Fresh Foods Ltd.',
    counterpartyType: 'buyer',
  },
  {
    id: '3',
    title: 'Rice Cultivation Contract',
    crop: 'Rice',
    quantity: '8,000 kg',
    price: '$0.75/kg',
    deadline: 'Dec 10, 2023',
    status: 'completed',
    counterparty: 'Asian Exports Co.',
    counterpartyType: 'buyer',
  },
  {
    id: '4',
    title: 'Corn Purchase Agreement',
    crop: 'Corn',
    quantity: '10,000 kg',
    price: '$0.35/kg',
    deadline: 'Oct 20, 2023',
    status: 'active',
    counterparty: 'Midwest Grains LLC',
    counterpartyType: 'buyer',
  },
  {
    id: '5',
    title: 'Potato Supply Contract',
    crop: 'Potatoes',
    quantity: '15,000 kg',
    price: '$0.30/kg',
    deadline: 'Nov 5, 2023',
    status: 'dispute',
    counterparty: 'Chip Factory Inc.',
    counterpartyType: 'buyer',
  },
  {
    id: '6',
    title: 'Soybean Purchase',
    crop: 'Soybeans',
    quantity: '7,500 kg',
    price: '$0.85/kg',
    deadline: 'Sep 15, 2023',
    status: 'active',
    counterparty: 'Global Foods Corp.',
    counterpartyType: 'buyer',
  },
];

const Contracts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filter contracts based on search query and status
  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      contract.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.counterparty.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      filterStatus === 'all' || contract.status === filterStatus;
      
    const matchesTab = 
      currentTab === 'all' || 
      (currentTab === 'active' && contract.status === 'active') ||
      (currentTab === 'pending' && contract.status === 'pending') ||
      (currentTab === 'completed' && contract.status === 'completed') ||
      (currentTab === 'issues' && (contract.status === 'dispute' || contract.status === 'cancelled'));
      
    return matchesSearch && matchesStatus && matchesTab;
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Contracts</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your farming contracts
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>New Contract</span>
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Contract Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <TabsList className="grid-cols-5">
                  <TabsTrigger value="all" className="text-xs md:text-sm">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="text-xs md:text-sm">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs md:text-sm">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs md:text-sm">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="issues" className="text-xs md:text-sm">
                    Issues
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search contracts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="dispute">In Dispute</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                {filteredContracts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No contracts found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContracts.map((contract) => (
                      <ContractCard
                        key={contract.id}
                        {...contract}
                        onClick={() => console.log(`Viewing contract ${contract.id}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contract Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Contracts</span>
                  <Badge variant="outline" className="font-medium">
                    {mockContracts.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Contracts</span>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    {mockContracts.filter(c => c.status === 'active').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Approval</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {mockContracts.filter(c => c.status === 'pending').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Issues/Disputes</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                    {mockContracts.filter(c => c.status === 'dispute' || c.status === 'cancelled').length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 pb-4">
                  <p className="text-sm font-medium">Contract Approved</p>
                  <p className="text-xs text-muted-foreground mt-1">Organic Tomatoes Supply with Fresh Foods Ltd.</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-4">
                  <p className="text-sm font-medium">Payment Received</p>
                  <p className="text-xs text-muted-foreground mt-1">$4,000 for Rice Cultivation Contract</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
                <div className="border-l-2 border-primary pl-4 pb-4">
                  <p className="text-sm font-medium">New Contract Offer</p>
                  <p className="text-xs text-muted-foreground mt-1">Corn Purchase Agreement from Midwest Grains LLC</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Contract
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Find Potential Buyers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  View Contract Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contracts;
