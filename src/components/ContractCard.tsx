
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Calendar,
  Truck,
  Check,
  Clock,
  X,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export interface ContractCardProps {
  id: string;
  title: string;
  crop: string;
  quantity: string;
  price: string;
  deadline: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'dispute';
  counterparty: string;
  counterpartyType: 'farmer' | 'buyer';
  className?: string;
  onClick?: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    label: 'Pending Approval'
  },
  active: {
    icon: Check,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    label: 'Active'
  },
  completed: {
    icon: Check,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    label: 'Completed'
  },
  cancelled: {
    icon: X,
    color: 'bg-red-100 text-red-800 border-red-200',
    label: 'Cancelled'
  },
  dispute: {
    icon: AlertTriangle,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    label: 'In Dispute'
  }
};

const ContractCard: React.FC<ContractCardProps> = ({
  id,
  title,
  crop,
  quantity,
  price,
  deadline,
  status,
  counterparty,
  counterpartyType,
  className,
  onClick,
}) => {
  const StatusIcon = statusConfig[status].icon;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Contract with <span className="font-medium text-foreground">{counterparty}</span>
            <span className="text-xs ml-1 capitalize">({counterpartyType})</span>
          </p>
        </div>
        <Badge variant="outline" className={cn("px-2 py-1 font-medium text-xs", statusConfig[status].color)}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusConfig[status].label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Crop</p>
          <p className="text-sm font-medium">{crop}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Quantity</p>
          <p className="text-sm font-medium">{quantity}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-sm font-medium">{price}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Deadline</p>
          <p className="text-sm font-medium">{deadline}</p>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full group">
        <span>View Details</span>
        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default ContractCard;
