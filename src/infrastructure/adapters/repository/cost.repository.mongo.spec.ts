import { GenericContainer, Wait } from 'testcontainers';
import { TestingModule, Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import InfrastructureModule from '../../infrastructure.module';

import ServiceRepositoryMongo from './cost.repository.mongo';
import CostSchema from './schema/cost.schema';
import CostDto from '../../../domain/dto/cost.dto';

describe('-- CostRepositoryMongo --', () => {
  
  let serviceRepositoryMongo: ServiceRepositoryMongo;
  let container;
  const mongoPort = 27017;
  jest.setTimeout(100000);
  beforeAll(async done => {
    container = await new GenericContainer('mongo')
      .withExposedPorts(mongoPort)
      .withWaitStrategy(Wait.forLogMessage('Listening on 0.0.0.0'))
      .start();

    const setting = { port: container.getMappedPort(mongoPort) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        InfrastructureModule.foorRoot(setting),
        MongooseModule.forFeature([{ name: 'Cost', schema: CostSchema }]),
      ],
      providers: [ServiceRepositoryMongo],
    }).compile();

    serviceRepositoryMongo = module.get<ServiceRepositoryMongo>(
      ServiceRepositoryMongo,
    );

    done();
  });

  afterAll(async done => {
    container.stop();
    done();
  });

  afterEach(async done => {
    await container.exec([
      'mongo',
      'adn',
      '--eval',
      "'db.dropDatabase();'",
    ]);
    done();
  });

  describe('-- getAll cost --', () => {
    it(' -> when get all cost', async done => {
      const costDto = new CostDto(
        '',
        'prueba',
        4,
        20000,
        0,
        new Date(),
      );
      await serviceRepositoryMongo.createCost(costDto);

      const costs = await serviceRepositoryMongo.getAll();

      expect(costs.length).toBe(1);
      expect(costs[0].type).toBe('prueba');
      done();
    });
  });

});