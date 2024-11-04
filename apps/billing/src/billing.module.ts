import { ConfigModule } from '@nestjs/config';
import * as JOI from 'joi'
import { Module } from '@nestjs/common';

import { AuthModule, RmqModule } from '@app/common';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: JOI.object({
      RABBIT_MQ_URI: JOI.string().required(),
      RABBIT_MQ_BILLING_QUEUE: JOI.string().required(),
    })
  }), AuthModule, RmqModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
