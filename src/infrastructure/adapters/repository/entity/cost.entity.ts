import { Document } from 'mongoose';

export interface CostEntity extends Document {
    type: string;
    amount: number;
    value: number;
    totalCost: number;
    createAt: Date;    
}