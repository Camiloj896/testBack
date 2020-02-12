import CostDto from 'src/domain/dto/cost.dto';

export interface CostRepository {

    getAll(): Promise<CostDto[]>;

    /**
   * Returns cost filtered by id
   * @param {string} productId
   * @returns a `cost` object containing the data.
   */
    getCost(id: string): Promise<CostDto>;

    createCost(cost: CostDto): Promise<CostDto>;

    updateCost(id: string, cost: CostDto): Promise<CostDto>;

    deleteCost(id: string): Promise<CostDto>;

}