import { Injectable, Inject } from '@nestjs/common';
import CostDto from 'src/domain/dto/cost.dto';
import CostService  from './../../domain/services/cost.service';

@Injectable()
export default class GetCostUseCase {

  constructor(@Inject('CostService') private costService: CostService) {}

    public handler(costId: string): Promise<CostDto>{
        return this.costService.getCost(costId);        
    }

}