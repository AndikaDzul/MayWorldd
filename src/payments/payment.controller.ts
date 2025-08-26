import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':method')
  async payment(@Body() body: any) {
    const { orderId, amount, customerName, email, phone } = body;
    return this.paymentService.createTransaction(orderId, amount, customerName, email, phone);
  }
}
