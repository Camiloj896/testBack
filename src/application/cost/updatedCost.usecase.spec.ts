import { Test, TestingModule } from '@nestjs/testing';
import UpdatedCostUseCase  from './updatedCost.usecase';
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

    let useCase: UpdatedCostUseCase;

    const eventModel = {
        updateCost: jest.fn().mockResolvedValue(cost),
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdatedCostUseCase,
                {
                    provide: 'CostService',
                    useValue: eventModel,
                },
            ],
        }).compile();

        useCase = module.get<UpdatedCostUseCase>(UpdatedCostUseCase);
    })

    it('Create Cost Use Case', () => {
        expect(useCase.handler(cost.id, cost)).resolves.toStrictEqual(cost);
    });
    
});