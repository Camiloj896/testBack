import { Test, TestingModule } from '@nestjs/testing';
import CostService  from './cost.service';
import CostDto from '../dto/cost.dto';

const cost: CostDto = {
    id: 'asd12345678',
    type: 'cost type',
    amount: 5,
    value: 20000,
    totalCost: 0,
    createAt: new Date()
}

describe('--- Cost Service ---', () => {

    let service: CostService;

    const eventModel = {
        getAll: jest.fn().mockResolvedValue([cost]),
        getCost: jest.fn().mockResolvedValue(cost),
        createCost: jest.fn().mockResolvedValue(cost),
        updateCost: jest.fn().mockResolvedValue(cost),
        deleteCost: jest.fn().mockResolvedValue(cost),
    };

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CostService,
                {
                    provide: 'CostRepositoryMongo',
                    useValue: eventModel,
                },
            ],
        }).compile();

        service = module.get<CostService>(CostService);
    })

    it('GetAll Cost', () => {
        expect(service.getAll()).resolves.toStrictEqual([cost]);
    });

    it('Get Cost', () => {
        expect(service.getCost(cost.id)).resolves.toStrictEqual(cost);
    });

    it('Create Cost', () => {
        expect(service.createCost(cost)).resolves.toStrictEqual(cost);
    });

    it('Update Cost', () => {
        expect(service.updateCost(cost.id, cost)).resolves.toStrictEqual(cost);
    });

    it('Delete Cost', () => {
        expect(service.deleteCost(cost.id)).resolves.toStrictEqual(cost);
    });
    
});