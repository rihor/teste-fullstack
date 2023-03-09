import { Delivery } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class Customer {
  @IsString()
  name: string;
}

export class CreateDeliveryInput {
  @ValidateNested()
  @Type(() => Customer)
  customer: Customer;

  @IsNumber()
  weight: number;

  @IsString()
  houseNumber: string;

  @IsString()
  district: string;

  @IsString()
  adjunct: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export type CreateDeliveryOutput = Delivery;
