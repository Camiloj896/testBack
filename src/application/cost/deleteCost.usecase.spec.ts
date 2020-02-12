import { Test, TestingModule } from '@nestjs/testing';
import DeleteCostUseCase  from './deleteCost.usecase';
import CostDto from './../../domain/dto/cost.dto';

const cost: CostDto = {
    id: 'asd12345678',
    type: 'cost type',
    amount: 5,
    value: 20000,
    totalCost: 0,
    createAt: new Date()
}

describe('--- Cost Use Case ---', () => {

    let useCase: DeleteCostUseCase;

    const eventModel = {
        deleteCost: jest.fn().mockResolvedValue(cost),
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteCostUseCase,
                {
                    provide: 'CostService',
                    useValue: eventModel,
                },
            ],
        }).compile();

        useCase = module.get<DeleteCostUseCase>(DeleteCostUseCase);
    })

    it('Deleted Cost Use Case', () => {
        expect(useCase.handler(cost.id)).resolves.toStrictEqual(cost);
    });
    
});