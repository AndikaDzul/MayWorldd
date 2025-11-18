import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.create(orderData);
  }

  // ✅ Tambahkan endpoint hapus order
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.orderService.delete(id);
    return { message: 'Order berhasil dihapus' };
  }
}
