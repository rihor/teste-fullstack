import { Customer, Delivery } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetDeliveriesInput {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  perPage: number;
}

export interface GetDeliveriesOutput {
  total: number;
  currentPage: number;
  totalPages: number;
  totalWeight: number;
  averageWeight: number;
  data: Array<
    Delivery & {
      customer: Customer;
    }
  >;
}
