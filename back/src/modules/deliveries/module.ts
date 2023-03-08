import { DeliveriesController } from './controller';
import { Module } from '@nestjs/common';
import { CustomersModule } from 'modules/customers/module';
import { CreateDeliveryService } from './use-cases/create-delivery/create-delivery.service';

@Module({
  imports: [CustomersModule],
  controllers: [DeliveriesController],
  providers: [CreateDeliveryService],
  exports: [],
})
export class DeliveriesModule {}
