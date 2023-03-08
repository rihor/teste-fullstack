import { Body, Controller, Post } from '@nestjs/common';
import { CreateDeliveryService } from './use-cases/create-delivery/create-delivery.service';
import {
  CreateDeliveryInput,
  CreateDeliveryOutput,
} from './use-cases/create-delivery/interfaces';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly createDelivery: CreateDeliveryService) {}

  @Post()
  async create(
    @Body() body: CreateDeliveryInput,
  ): Promise<CreateDeliveryOutput> {
    return this.createDelivery.execute(body);
  }
}
