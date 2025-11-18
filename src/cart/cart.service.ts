import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from './cart.entity';

@Injectable()
export class CartService {
  private cart: CartItem[] = [
    { id: 1, nama: 'Nasi Goreng Spesial', jumlah: 2, harga: 25000 },
    { id: 2, nama: 'Es Teh Manis', jumlah: 3, harga: 5000 },
  ];

  findAll(): CartItem[] {
    return this.cart;
  }

  findOne(id: number): CartItem {
    const item = this.cart.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Item tidak ditemukan');
    return item;
  }

  create(item: CartItem): CartItem {
    item.id = this.cart.length ? this.cart[this.cart.length - 1].id + 1 : 1;
    this.cart.push(item);
    return item;
  }

  remove(id: number): void {
    const index = this.cart.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException('Item tidak ditemukan');
    this.cart.splice(index, 1);
  }
}
