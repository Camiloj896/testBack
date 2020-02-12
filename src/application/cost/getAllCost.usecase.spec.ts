import { Test, TestingModule } from '@nestjs/testing';
import GetAllCostsUseCase  from './getAllCost.usecase';
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

    let useCase: GetAllCostsUseCase;

    const eventModel = {
        getAll: jest.fn().mockResolvedValue([cost])
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllCostsUseCase,
                {
                    provide: 'CostService',
                    useValue: eventModel,
                },
            ],
        }).compile();

        useCase = module.get<GetAllCostsUseCase>(GetAllCostsUseCase);
    })

    it('GetAll Costs Use Case', () => {
        expect(useCase.handler()).resolves.toStrictEqual([cost]);
    });
    
});