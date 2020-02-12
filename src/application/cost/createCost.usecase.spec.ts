import { Test, TestingModule } from '@nestjs/testing';
import CreateCostUseCase  from './createCost.usecase';
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

    let useCase: CreateCostUseCase;

    const eventModel = {
        createCost: jest.fn().mockResolvedValue(cost)
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCostUseCase,
                {
                    provide: 'CostService',
                    useValue: eventModel,
                },
            ],
        }).compile();

        useCase = module.get<CreateCostUseCase>(CreateCostUseCase);
    })

    it('Create Cost Use Case', () => {
        expect(useCase.handler(cost)).resolves.toStrictEqual(cost);
    });
    
});