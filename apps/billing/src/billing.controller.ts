import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RmqService } from '@app/common';

import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) { }


  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }
  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    // this.rmqService.ack(context);
  }
}
