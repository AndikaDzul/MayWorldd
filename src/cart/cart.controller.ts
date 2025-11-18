import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll(): CartItem[] {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CartItem {
    return this.cartService.findOne(+id);
  }

  @Post()
  create(@Body() item: CartItem): CartItem {
    return this.cartService.create(item);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.cartService.remove(+id);
  }
}
