
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';
import ContractCard, { ContractCardProps } from './ContractCard';

// Mock data for demonstration
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
  }
];

interface DashboardProps {
  userType: 'farmer' | 'buyer';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === 'farmer' ? 'Active Contracts' : 'Active Suppliers'}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === 'farmer' ? 'Total Revenue' : 'Procurement Budget'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,565</div>
            <p className="text-xs text-muted-foreground mt-1">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === 'farmer' ? 'Crop Yield' : 'Procurement Volume'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48,253 kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              +7% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userType === 'farmer' ? 'Upcoming Deliveries' : 'Pending Deliveries'}
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next: Aug 12, 2023
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Recent Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {mockContracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  {...contract}
                  onClick={() => console.log(`Clicked contract ${contract.id}`)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Contract Review</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Today
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Review and sign the corn supply contract with Farm Fresh Inc.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Delivery</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Tomorrow
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Scheduled potato delivery to Mountain Foods at 10:00 AM.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Crop Inspection</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    Aug 15
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Quality check for tomato crops by Fresh Produce Inc. inspectors.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Farming Workshop</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    Aug 18
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Attend organic farming techniques workshop by AgriTech Experts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
