
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AuthModal from '@/components/AuthModal';
import { ArrowRight, Check, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGetStarted = () => {
    setAuthType('register');
    setAuthModalOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
  };

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-emerald-500" />,
      title: 'For Farmers',
      items: [
        'Guaranteed market and fair prices',
        'Access to quality inputs and technical assistance',
        'Reduced marketing and transaction costs',
        'Financial support and advance payments',
        'Improved farming practices and technologies'
      ]
    },
    {
      icon: <Check className="h-6 w-6 text-blue-500" />,
      title: 'For Buyers',
      items: [
        'Consistent supply of high-quality produce',
        'Direct access to farmers without intermediaries',
        'Better control over production processes',
        'Reliable scheduling of deliveries',
        'Traceability and quality assurance'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Features Section */}
      <Features />
      
      {/* Benefits Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-5">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              How AgriConnect benefits both farmers and buyers
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform creates a win-win situation, empowering farmers with reliable income and providing buyers with quality produce.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-8 shadow-sm border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollVariants}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-primary/10 p-3 mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                </div>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-5">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              How Contract Farming Works
            </h2>
            <p className="text-lg text-muted-foreground">
              A simple and transparent process from registration to payment
            </p>
          </motion.div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Registration',
                description: 'Create a profile specifying your role, location, and preferences.',
                icon: <Shield className="h-8 w-8 text-primary" />
              },
              {
                step: '02',
                title: 'Contract Creation',
                description: 'Negotiate and digitally sign a clear, fair agreement with defined terms.',
                icon: <Zap className="h-8 w-8 text-primary" />
              },
              {
                step: '03',
                title: 'Production & Monitoring',
                description: 'Track progress with real-time updates and automatic notifications.',
                icon: <Shield className="h-8 w-8 text-primary" />
              },
              {
                step: '04',
                title: 'Delivery & Payment',
                description: 'Secure, automated payments upon successful delivery verification.',
                icon: <Zap className="h-8 w-8 text-primary" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-8 shadow-sm border relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-2 -right-2 text-6xl font-bold text-primary/5">
                  {item.step}
                </div>
                <div className="rounded-lg inline-flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to transform your agricultural business?
            </motion.h2>
            <motion.p 
              className="text-lg text-primary-foreground/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join thousands of farmers and buyers already benefiting from our platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-primary hover-lift font-medium"
                onClick={handleGetStarted}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        type={authType}
        setType={setAuthType}
        onLogin={handleLogin}
      />
    </Layout>
  );
};

export default Index;
