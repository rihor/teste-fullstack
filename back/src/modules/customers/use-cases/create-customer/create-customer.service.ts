import { CreateCustomerInput } from './interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/db/prisma.service';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: CreateCustomerInput) {
    const customer = await this.prisma.customer.upsert({
      where: { name: input.name },
      create: { name: input.name },
      update: {},
    });

    return customer;
  }
}
