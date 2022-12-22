import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/Order';
import { OrdersController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [OrderService]
})
export class OrdersModule {}
