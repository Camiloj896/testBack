import { Injectable, Inject } from '@nestjs/common';
import CostDto from 'src/domain/dto/cost.dto';
import CostService from './../../domain/services/cost.service';

@Injectable()
export default class GetAllCostsUseCase {

    constructor(@Inject('CostService') private costService: CostService) {}

    public handler(): Promise<CostDto[]>{
        return this.costService.getAll();        
    }
    
}