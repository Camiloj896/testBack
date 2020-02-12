import { Injectable, Inject } from '@nestjs/common';
import CostDto from 'src/domain/dto/cost.dto';
import CostService from './../../domain/services/cost.service';

@Injectable()
export default class CreateCostUseCase {

    constructor(@Inject('CostService') private costService: CostService) {}

    public async handler(cost: CostDto): Promise<CostDto>{   
        const prueba = await this.costService.createCost(cost)
        return prueba;        
    }
    
}