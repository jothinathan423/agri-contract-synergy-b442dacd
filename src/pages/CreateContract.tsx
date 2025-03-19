
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  ArrowLeft, 
  CalendarIcon, 
  FileUp, 
  HelpCircle, 
  Loader2, 
  Save 
} from 'lucide-react';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

// Define the form schema with Zod
const contractFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  counterparty: z.string().min(2, 'Counterparty name must be at least 2 characters'),
  counterpartyType: z.enum(['buyer', 'farmer']),
  crop: z.string().min(2, 'Crop name must be at least 2 characters'),
  quantity: z.string().min(1, 'Quantity is required'),
  quantityUnit: z.string().min(1, 'Unit is required'),
  price: z.string().min(1, 'Price is required'),
  priceUnit: z.string().min(1, 'Price unit is required'),
  description: z.string().optional(),
  deliveryDate: z.date({
    required_error: "Delivery date is required",
  }),
  qualityStandards: z.string().optional(),
  paymentTerms: z.string().min(5, 'Payment terms must be at least 5 characters'),
  additionalTerms: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

const CreateContract = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      title: '',
      counterparty: '',
      counterpartyType: 'buyer',
      crop: '',
      quantity: '',
      quantityUnit: 'kg',
      price: '',
      priceUnit: 'per kg',
      description: '',
      paymentTerms: '50% advance, 50% on delivery',
      qualityStandards: '',
      additionalTerms: '',
    },
  });
  
  const onSubmit = (data: ContractFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call to create contract
    setTimeout(() => {
      console.log('Contract data:', data);
      setIsSubmitting(false);
      
      toast({
        title: "Contract Created",
        description: "Your contract has been created successfully.",
      });
      
      navigate('/contracts');
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/contracts');
  };
  
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
          <h1 className="text-3xl font-bold tracking-tight">Create New Contract</h1>
          <p className="text-muted-foreground mt-1">
            Define the terms for a new farming contract
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Provide the fundamental details about this contract
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Wheat Supply Agreement 2023" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for your contract
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="counterparty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Counterparty Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. GrainCorp Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="counterpartyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Counterparty Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buyer">Buyer</SelectItem>
                            <SelectItem value="farmer">Farmer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the contract purpose and scope" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Crop & Delivery Details</CardTitle>
                <CardDescription>
                  Specify the crop, quantity, price, and delivery information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Wheat, Rice, Corn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="quantityUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="ton">Metric Tons</SelectItem>
                            <SelectItem value="lb">Pounds (lb)</SelectItem>
                            <SelectItem value="bushel">Bushels</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0.40" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="priceUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Unit</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="per kg">Per kg</SelectItem>
                            <SelectItem value="per ton">Per ton</SelectItem>
                            <SelectItem value="per lb">Per lb</SelectItem>
                            <SelectItem value="per bushel">Per bushel</SelectItem>
                            <SelectItem value="total">Total price</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The deadline for crop delivery
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  Define the quality standards, payment terms, and additional conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="qualityStandards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Standards</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specify quality requirements, e.g. moisture content, protein levels, etc." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specify payment schedule, methods, and conditions" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Terms</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any other terms, conditions, or special requirements" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                  <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Supporting Documents</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Drag and drop files or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOCX, or JPG files up to 10MB each
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center border-t pt-6">
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancel
              </Button>
              
              <div className="space-x-2">
                <Button type="button" variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Contract"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </motion.div>
    </Layout>
  );
};

export default CreateContract;
