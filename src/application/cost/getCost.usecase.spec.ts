import { Test, TestingModule } from '@nestjs/testing';
import GetCostUseCase  from './getCost.usecase';
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

    let useCase: GetCostUseCase;

    const eventModel = {
        getCost: jest.fn().mockResolvedValue(cost)
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCostUseCase,
                {
                    provide: 'CostService',
                    useValue: eventModel,
                },
            ],
        }).compile();

        useCase = module.get<GetCostUseCase>(GetCostUseCase);
    })

    it('Get Cost Use Case', () => {
        expect(useCase.handler(cost.id)).resolves.toStrictEqual(cost);
    });
    
});