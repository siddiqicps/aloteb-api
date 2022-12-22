import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedRequestDto } from 'src/common_dto/paginated-request.dto';
import { Order } from 'src/entity/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ListOrderDto } from './dtos/list-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private _orderRepository: Repository<Order>
    ){}
    
    async findAll(listUserDto: PaginatedRequestDto<ListOrderDto>): Promise<any> {
        const queryBuilder = this._orderRepository.createQueryBuilder("order");
        const itemCount = await queryBuilder.getCount();
        let { entities } = await queryBuilder.getRawAndEntities();
        return entities;
    }

    async createOrder(orderDto: CreateOrderDto): Promise<any> {
        const created_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
        const order: Order = new Order();
        order.customer_first_name = orderDto?.customer_first_name
        order.customer_last_name = orderDto?.customer_last_name;
        order.status = orderDto?.status
        order.total_item_count = orderDto?.total_item_count
        order.base_sub_total = orderDto?.base_sub_total
        order.base_grand_total = orderDto?.base_grand_total
        order.created_at = created_at
        
        const savedUser = this._orderRepository.save(order);
        return savedUser;
    }

    async updateUser(updateOrderDto: UpdateOrderDto): Promise<any> {
        const updated_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ')
        const order: Order = new Order();
        order.customer_first_name = updateOrderDto?.customer_first_name
        order.customer_last_name = updateOrderDto?.customer_last_name;
        order.status = updateOrderDto?.status
        order.total_item_count = updateOrderDto?.total_item_count
        order.base_sub_total = updateOrderDto?.base_sub_total
        order.base_grand_total = updateOrderDto?.base_grand_total
        order.updated_at = updated_at
        
        const updatedOrder = this._orderRepository
                            .createQueryBuilder('orders')
                            .update(Order)
                            .set(order)
                            .where("order_id = :id", { id: updateOrderDto?.order_id })
                            .execute()
        return updatedOrder;
    }

    // async deleteUser(deleteUserDto: DeleteUserDto): Promise<any> {
    //     const deletedUser = await this._userRepository
    //                         .createQueryBuilder('users')
    //                         .delete()
    //                         .from(User)
    //                         .where("uid = :id", { id: deleteUserDto?.uid })
    //                         .execute()
    //     return deletedUser;
    // }
}
