import { DeliveriesController } from './controller';
import { Module } from '@nestjs/common';
import { CustomersModule } from 'modules/customers/module';
import { CreateDeliveryService } from './use-cases/create-delivery/create-delivery.service';
import { GetDeliveriesService } from './use-cases/get-deliveries/get-deliveries.service';

@Module({
  imports: [CustomersModule],
  controllers: [DeliveriesController],
  providers: [CreateDeliveryService, GetDeliveriesService],
  exports: [],
})
export class DeliveriesModule {}
