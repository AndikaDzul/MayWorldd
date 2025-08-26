import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class PaymentService {
  private snap: midtransClient.Snap;

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: false, // pakai sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });
  }

  // Method createTransaction
  async createTransaction(
    orderId: string,
    amount: number,
    customerName: string,
    email: string,
    phone: string,
  ): Promise<{ token: string }> {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: customerName,
        email,
        phone,
      },
    };

    const transaction = await this.snap.createTransaction(parameter);
    return { token: transaction.token };
  }
}
