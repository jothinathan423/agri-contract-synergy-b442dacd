import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Scale, Truck } from 'lucide-react';

export interface ContractCardProps {
  id: string;
  title: string;
  crop: string;
  quantity: string;
  price: string;
  deadline: string;
  status: 'active' | 'pending' | 'completed' | 'dispute' | 'cancelled';
  counterparty: string;
  counterpartyType: 'buyer' | 'farmer';
  onClick?: () => void;
}

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
  onClick
}) => {
  // Status color mapping
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

  const statusConfig = statusColors[status];

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            variant="outline" 
            className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-medium`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">ID: {id}</span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">
          {counterpartyType === 'buyer' ? 'Buyer' : 'Farmer'}: {counterparty}
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Crop</p>
            <p className="font-medium">{crop}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Quantity</p>
            <p className="font-medium">{quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price</p>
            <p className="font-medium">{price}</p>
          </div>
          <div className="flex items-start">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Deadline</p>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                <p className="font-medium">{deadline}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-3 pb-3">
        <Button variant="ghost" size="sm" className="w-full justify-between text-primary">
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContractCard;
