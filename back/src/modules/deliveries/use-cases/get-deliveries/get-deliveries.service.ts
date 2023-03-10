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

    const totalWeightPromise = this.prisma.delivery.aggregate({
      _sum: { weight: true },
    });

    const [deliveries, total, totalWeightAggregate] = await Promise.all([
      deliveriesPromise,
      countPromise,
      totalWeightPromise,
    ]);

    const totalWeight = totalWeightAggregate._sum.weight;
    const averageWeight = totalWeight / total;

    return {
      data: deliveries,
      total,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
      totalWeight,
      averageWeight,
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
