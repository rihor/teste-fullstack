import { Module } from '@nestjs/common';
import { CreateCustomerService } from './use-cases/create-customer/create-customer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CreateCustomerService],
  exports: [CreateCustomerService],
})
export class CustomersModule {}
