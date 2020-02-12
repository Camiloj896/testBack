import CostDto from './../../domain/dto/cost.dto';
import { CostEntity } from './../adapters/repository/entity/cost.entity';

export default class CostMapper {

    public static toDomain(costEntity: CostEntity): CostDto {
        return new CostDto(
            costEntity.id,
            costEntity.type,
            costEntity.amount,
            costEntity.value,
            costEntity.totalCost,
            new Date(costEntity.createAt),            
        );
    }
   
    public static toDomains(costEntity: CostEntity[]): CostDto[] {
        const costs = new Array<CostDto>();
        costEntity.forEach( costEntity => {
            const cost = this.toDomain(costEntity);
            costs.push(cost)
        });
        return costs;
    }

}