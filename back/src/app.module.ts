import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'shared/interceptors/logger.interceptor';
import { PrismaService } from 'shared/db/prisma.service';
import { PrismaModule } from 'shared/db/prisma.module';
import { DeliveriesModule } from 'modules/deliveries/module';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, DeliveriesModule],
  controllers: [],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
