import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CostEntity } from 'src/infrastructure/adapters/repository/entity/cost.entity';
import { CostRepository } from 'src/domain/ports/cost.repository';
import CostMapper from './../../mapper/cost.mapper';
import CostDto from 'src/domain/dto/cost.dto';

@Injectable()
export default class ServiceRepositoryMongo implements CostRepository{
    
    constructor(@InjectModel('Cost') private costModel: Model<CostEntity>){}

    public async getAll(): Promise<CostDto[]> {
        const costs = await this.costModel.find();
        return CostMapper.toDomains(costs);
    }

    public async getCost(costId: string): Promise<CostDto> {
        let cost = await this.costModel.findById(costId);
        return CostMapper.toDomain(cost);
    }

    public async createCost(cost: CostDto): Promise<CostDto> {
        let costCreated = new this.costModel(cost);
        costCreated = await costCreated.save(); 
        return CostMapper.toDomain(costCreated);
    }

    public async updateCost(costId: string, cost: CostDto): Promise<CostDto> {
        const costUpdated = await this.costModel.findByIdAndUpdate(
          costId,
          cost,
          { new: true },
        );
        return CostMapper.toDomain(costUpdated);
    }

    public async deleteCost(costId: string): Promise<CostDto> {
        let costDeleted = await this.costModel.findByIdAndDelete(costId);       
        return CostMapper.toDomain(costDeleted);
    }

}