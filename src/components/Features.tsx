
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  BarChart, 
  Truck, 
  CreditCard, 
  MessageSquare, 
  UserCheck 
} from 'lucide-react';

const features = [
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: 'Farmer Registration',
    description: 'Simple profile creation for farmers with land details and crop specialization.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Digital Contracts',
    description: 'Standardized agreements with clear terms, prices, and schedules for all parties.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Crop Monitoring',
    description: 'AI-powered predictions and real-time updates on crop progress and yield estimates.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Logistics Management',
    description: 'Streamlined supply chain coordination between farmers and buyers for timely deliveries.',
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: 'Secure Payments',
    description: 'Integrated payment system with multiple options and automatic processing upon delivery.',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'Dispute Resolution',
    description: 'Dedicated communication channels and support for resolving contract disagreements.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-5">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Everything you need for successful contract farming
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive suite of features creates a seamless experience for both farmers and buyers, 
            ensuring transparency, efficiency, and trust at every step.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-lg inline-flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
