import { PrismaService } from 'shared/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDeliveryInput, CreateDeliveryOutput } from './interfaces';

import { CreateCustomerService } from 'modules/customers/use-cases/create-customer/create-customer.service';

@Injectable()
export class CreateDeliveryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createCustomer: CreateCustomerService,
  ) {}

  async execute(input: CreateDeliveryInput): Promise<CreateDeliveryOutput> {
    const customer = await this.createCustomer.execute({
      name: input.customer.name,
    });

    const delivery = await this.prisma.delivery.create({
      data: {
        weight: input.weight,
        country: input.country,
        state: input.state,
        city: input.city,
        district: input.district,
        street: input.street,
        houseNumber: input.houseNumber,
        adjunct: input.adjunct,
        latitude: input.latitude,
        longitude: input.longitude,
        customerId: customer.id,
      },
    });

    return delivery;
  }
}
