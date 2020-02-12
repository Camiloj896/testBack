import { Injectable, Inject } from '@nestjs/common';
import CostDto from '../dto/cost.dto';
import { CostRepository } from 'src/domain/ports/cost.repository';

@Injectable()
export default class CostService { 

    constructor(@Inject('CostRepositoryMongo') private costRepository: CostRepository) { }

    // CREATE NEW COST
    // --------------------------------->
    async createCost(cost: CostDto): Promise<CostDto> {

        //GET TOTAL COST
        cost.totalCost = this.totalCost(cost.amount, cost.value);
        
        const createService = await this.costRepository.createCost(cost);
        return createService;
    }

    // GET ALL COST
    // --------------------------------->
    getAll(): Promise<CostDto[]> {        
        return this.costRepository.getAll();  
    }

    // GET COST BY ID
    // --------------------------------->
    getCost(costId: string): Promise<CostDto> {
      return this.costRepository.getCost(costId);
    }

    // DELETE COST
    // --------------------------------->
    deleteCost(id: string): Promise<CostDto> {
        return this.costRepository.deleteCost(id);
    }

    // UPDATE COST
    // --------------------------------->
    updateCost(costId: string, cost: CostDto): Promise<CostDto> {
        return this.costRepository.updateCost(costId, cost);
    }

    // CALCULATE TOTAL COST BY DAY OF WEEK
    // ----------------------------------->
    totalCost(amount: Number, value: Number) {

        //GET DAY OF WEEK
        const date = new Date();
        const dayArray =['Sunday', 'Monday', 'Tuesday', ' Wednesday', 'Thursday', ' Friday', 'Saturday'];

        //TAX
        const valueService = Number(amount) * Number(value);
        const tax = (dayArray[date.getDay()] === 'Monday') ? 0 : valueService * 0.19;

        //RETURN TOTAL COST 
        return Number(valueService) + Number(tax);        
    
    }

}




