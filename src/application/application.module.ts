import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from './../domain/domain.module';
import CostSchema from './../infrastructure/adapters/repository/schema/cost.schema';
import CostRepositoryMongo from './../infrastructure/adapters/repository/cost.repository.mongo';
import GetAllCostsUseCase from './cost/getAllCost.usecase';
import CreateCostUseCase from './cost/createCost.usecase';
import GetCostUseCase from './cost/getCost.usecase';
import UpdatedCostUseCase from './cost/updatedCost.usecase';
import DeleteCostUseCase from './cost/deleteCost.usecase';
import CostService from './../domain/services/cost.service';

@Module({
    imports: [
      DomainModule,
      MongooseModule.forFeature([
        {
          name: 'Cost', 
          schema: CostSchema,
        },
      ]),
    ],
    providers: [
      GetAllCostsUseCase,
      GetCostUseCase,
      CreateCostUseCase,
      UpdatedCostUseCase,
      DeleteCostUseCase,
      {
        provide: 'CostService',
        useClass: CostService,
      },
      {
        provide: 'CostRepositoryMongo',
        useClass: CostRepositoryMongo,
      }
    ],
    exports: [
      GetAllCostsUseCase,
      GetCostUseCase,
      CreateCostUseCase,
      UpdatedCostUseCase,
      DeleteCostUseCase,
    ],
  })

export default class ApplicationModule {}
