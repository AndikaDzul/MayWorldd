export class CreateOrderDto {
  orderId: string;
  amount: number;
  customerName: string;
  email?: string;
  phone?: string;
}
