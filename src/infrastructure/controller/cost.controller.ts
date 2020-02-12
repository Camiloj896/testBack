import { Controller, Get, Post, Res, Body, Param, HttpStatus, Put, Delete } from '@nestjs/common';
import GetAllCostsUseCase from './../../application/cost/getAllCost.usecase';
import CreateCostUseCase from './../../application/cost/createCost.usecase';
import GetCostUseCase from './../../application/cost/getCost.usecase';
import UpdateCostUseCase from './../../application/cost/updatedCost.usecase';
import DeleteCostUseCase from './../../application/cost/deleteCost.usecase';
import CostDto from './../../domain/dto/cost.dto';

@Controller('cost/')
export class CostController {
    
    constructor(
        private getAllCostsUseCase: GetAllCostsUseCase,
        private createCostUseCase: CreateCostUseCase,
        private getCostUseCase: GetCostUseCase,
        private updateCostUseCase: UpdateCostUseCase,
        private deleteCostUseCase: DeleteCostUseCase,
        // private getTotalCost: GetTotalCost
    ){}

    @Get()
    public async getCosts(@Res() request ): Promise<any>{
        const costs = await this.getAllCostsUseCase.handler();
        return request.status(HttpStatus.OK).json(costs);
    }

    @Get(":id")
    public async getCost(@Res() request, @Param('id') id: string ): Promise<any> {
        const cost = await this.getCostUseCase.handler(id);    
        return request.status(HttpStatus.OK).json(cost);
    }

    @Post()
    public async createCost(@Res() request, @Body() cost: CostDto): Promise<any> {
        const costCreated = await this.createCostUseCase.handler(cost);
        return request.status(HttpStatus.CREATED).json(costCreated);
    }

    @Put(':id')
    public async updateCost(@Res() request, @Body() cost: CostDto, @Param('id') id: string): Promise<any> {
        const costUpdated = await this.updateCostUseCase.handler(id, cost);
        return request.status(HttpStatus.OK).json(costUpdated);
    }

    @Delete(':id')
    public async deleteCost(@Res() request, @Param('id') id: string): Promise<any> {
        const cost = await this.deleteCostUseCase.handler(id);
        return request.status(HttpStatus.OK).json(cost);
    }
    
}
