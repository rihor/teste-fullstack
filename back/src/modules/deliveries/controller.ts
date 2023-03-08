import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateDeliveryService } from './use-cases/create-delivery/create-delivery.service';
import {
  CreateDeliveryInput,
  CreateDeliveryOutput,
} from './use-cases/create-delivery/interfaces';
import { GetDeliveriesService } from './use-cases/get-deliveries/get-deliveries.service';
import {
  GetDeliveriesInput,
  GetDeliveriesOutput,
} from './use-cases/get-deliveries/interfaces';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly createDelivery: CreateDeliveryService,
    private readonly getDeliveries: GetDeliveriesService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateDeliveryInput,
  ): Promise<CreateDeliveryOutput> {
    return this.createDelivery.execute(body);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() query: GetDeliveriesInput): Promise<GetDeliveriesOutput> {
    return this.getDeliveries.execute(query);
  }
}
