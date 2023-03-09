import {
  Body,
  Controller,
  Delete,
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
import { DeleteAllService } from './use-cases/delete-all/delete-all.service';
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
    private readonly deleteAll: DeleteAllService,
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

  @Delete()
  async delete(): Promise<void> {
    return this.deleteAll.execute();
  }
}
