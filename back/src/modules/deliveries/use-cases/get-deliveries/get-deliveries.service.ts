import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/db/prisma.service';
import { GetDeliveriesInput, GetDeliveriesOutput } from './interfaces';

@Injectable()
export class GetDeliveriesService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: GetDeliveriesInput): Promise<GetDeliveriesOutput> {
    const page = this.parsePage(input.page);
    const perPage = this.parsePerPage(input.perPage);

    const deliveriesPromise = this.prisma.delivery.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        customer: true,
      },
    });

    const countPromise = this.prisma.delivery.count();

    const [deliveries, total] = await Promise.all([
      deliveriesPromise,
      countPromise,
    ]);

    return {
      data: deliveries,
      total,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    };
  }

  private parsePage(page: number): number {
    if (page <= 0) {
      return 1;
    }

    return page;
  }

  private parsePerPage(perPage: number): number {
    if (perPage <= 0) {
      return 1;
    }

    return perPage;
  }
}
