import { PrismaService } from 'shared/db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAllService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<void> {
    await this.prisma.delivery.deleteMany();
    await this.prisma.customer.deleteMany();

    return;
  }
}
