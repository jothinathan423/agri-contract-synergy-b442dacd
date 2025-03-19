
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Calendar, 
  Check, 
  Clock, 
  Download, 
  FileText, 
  MessageSquare, 
  Scale, 
  Truck, 
  Users 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

// Mock data - replace with actual API call
const contractDetails = {
  id: '1',
  title: 'Wheat Supply Agreement',
  crop: 'Wheat',
  quantity: '5,000 kg',
  price: '$0.40/kg',
  totalValue: '$2,000',
  deadline: 'Sep 30, 2023',
  createdAt: 'May 15, 2023',
  status: 'active',
  counterparty: 'GrainCorp Inc.',
  counterpartyType: 'buyer',
  description: 'Agreement to supply premium quality wheat to GrainCorp Inc. for processing into flour products.',
  terms: [
    'Premium quality wheat with protein content of 11-13%',
    'Moisture content not exceeding 14%',
    'Free from foreign materials and pests',
    'Delivery to GrainCorp facility in Midwest Region',
    'Payment within 15 days of delivery acceptance'
  ],
  timeline: [
    { date: 'May 15, 2023', event: 'Contract Created', completed: true },
    { date: 'May 20, 2023', event: 'Contract Signed', completed: true },
    { date: 'Jun 10, 2023', event: 'First Payment (Advance)', completed: true },
    { date: 'Aug 15, 2023', event: 'Quality Inspection', completed: false },
    { date: 'Sep 30, 2023', event: 'Harvest & Delivery', completed: false },
    { date: 'Oct 15, 2023', event: 'Final Payment', completed: false }
  ],
  messages: [
    { 
      id: 1, 
      sender: 'John Farmer', 
      timestamp: '2 days ago', 
      content: 'The crops are developing well despite the recent dry spell. Should be on track for the deadline.' 
    },
    { 
      id: 2, 
      sender: 'GrainCorp Inc.', 
      timestamp: '1 day ago', 
      content: 'That\'s great news! Our quality team will be available for the inspection as scheduled in August.' 
    }
  ]
};

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Replace with actual API call in a real implementation
  const contract = contractDetails;
  
  const handleBack = () => {
    navigate('/contracts');
  };
  
  const handleDownloadContract = () => {
    toast({
      title: "Contract Downloaded",
      description: "The contract document has been downloaded successfully.",
    });
  };
  
  // Map status to colors
  const statusColors = {
    active: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-200"
    },
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200"
    },
    completed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200"
    },
    dispute: {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200"
    },
    cancelled: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200"
    }
  };
  
  const statusConfig = statusColors[contract.status as keyof typeof statusColors] || statusColors.active;
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contracts
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{contract.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-medium`}
                >
                  {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">ID: {contract.id}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <Button variant="outline" onClick={handleDownloadContract}>
                <Download className="mr-2 h-4 w-4" />
                Download Contract
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full max-w-3xl grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="terms">Terms & Details</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Contract Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Crop</p>
                      <p className="font-medium">{contract.crop}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-medium">{contract.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium">{contract.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-medium">{contract.totalValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p className="font-medium">{contract.createdAt}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Deadline</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <p className="font-medium">{contract.deadline}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p>{contract.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Counterparty</p>
                    </div>
                    <p className="font-medium">{contract.counterparty}</p>
                    <p className="text-sm text-muted-foreground">
                      {contract.counterpartyType === 'buyer' ? 'Buyer' : 'Farmer'}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contract.timeline.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                            item.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {item.completed ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                          {index < contract.timeline.length - 1 && (
                            <div className={`w-0.5 h-full ${
                              item.completed ? 'bg-green-200' : 'bg-gray-200'
                            } my-1`} />
                          )}
                        </div>
                        <div className="pb-5">
                          <p className="font-medium">{item.event}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contract Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2">Quality Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {contract.terms.map((term, index) => (
                      <li key={index} className="text-muted-foreground">{term}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Payment Terms</h3>
                  <p className="text-muted-foreground">Payment will be made in two installments:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li className="text-muted-foreground">30% advance payment upon contract signing</li>
                    <li className="text-muted-foreground">70% payment within 15 days of delivery and quality verification</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Delivery Instructions</h3>
                  <p className="text-muted-foreground">Delivery must be made to the following address:</p>
                  <div className="bg-muted p-3 rounded-md mt-2">
                    <p>GrainCorp Processing Facility</p>
                    <p>123 Industrial Boulevard</p>
                    <p>Midwest Region, 54321</p>
                    <p>Contact: Operations Manager (555-123-4567)</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Contract Violation Terms</h3>
                  <p className="text-muted-foreground">In case of contract violations:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li className="text-muted-foreground">Quality below specified standards: Price reduction of up to 20% based on severity</li>
                    <li className="text-muted-foreground">Quantity shortage: Penalty of 5% on the value of missing quantity</li>
                    <li className="text-muted-foreground">Late delivery: Penalty of 2% per week of delay, up to 20% maximum</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Master Agreement.pdf</p>
                      <p className="text-sm text-muted-foreground">Uploaded on May 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Quality Standards.pdf</p>
                      <p className="text-sm text-muted-foreground">Uploaded on May 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Delivery Instructions.pdf</p>
                      <p className="text-sm text-muted-foreground">Uploaded on May 15, 2023</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{message.sender}</p>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground">{message.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t p-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button>Send</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">GrainCorp Inc.</p>
                    <p className="text-muted-foreground">Buyer</p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Primary Contact</p>
                        <p>Sarah Johnson</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>(555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>sjohnson@graincorp.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Position</p>
                        <p>Procurement Manager</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="font-medium">Your Information</p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p>John Farmer</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>(555) 987-6543</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>john@farmeremail.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Farm Name</p>
                        <p>Sunrise Farms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default ContractDetail;
