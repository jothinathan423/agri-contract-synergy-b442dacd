
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                    <span>New Platform</span>
                    <span className="ml-2 h-1 w-1 rounded-full bg-primary"></span>
                    <span className="ml-2">Agriculture Innovation</span>
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
                  Connecting Farmers & Buyers with Digital Contracts
                </h1>
                <p className="text-xl text-muted-foreground">
                  Streamline your agricultural agreements with our secure, transparent, and efficient contract farming platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onGetStarted} className="hover-lift">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Fair pricing</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Advanced analytics</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              <div className="relative">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
                  <div className="py-4 px-6 bg-accent/50 border-b border-border flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium">Contract Dashboard</div>
                    <div></div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Contract Status</div>
                        <div className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Active</div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Quantity</div>
                        <div className="font-medium">5,000 kg</div>
                      </div>
                      <div className="border border-border rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Price</div>
                        <div className="font-medium">$0.40/kg</div>
                      </div>
                      <div className="border border-border rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Crop</div>
                        <div className="font-medium">Wheat</div>
                      </div>
                      <div className="border border-border rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Deadline</div>
                        <div className="font-medium">Sep 30, 2023</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center px-4 py-3 bg-muted rounded-lg">
                      <div>
                        <div className="text-xs text-muted-foreground">Next payment</div>
                        <div className="font-medium">$2,000 on Jul 15</div>
                      </div>
                      <Button size="sm" variant="secondary">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
