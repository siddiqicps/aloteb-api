import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginatedRequestDto } from 'src/common_dto/paginated-request.dto';
import { PaginatedDto } from 'src/common_dto/pagination.dto';
import { ResponseDto } from 'src/common_dto/response.dto';
import { Order } from 'src/config/order.constants';
import { ApiPaginatedResponse } from 'src/custom_decorators/pagination.decorator';
import { ApiRequestPayload } from 'src/custom_decorators/request-payload.decorator';
import { ListUserDto } from 'src/users/dtos/list-user.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ListOrderDto } from './dtos/list-order.dto';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private userService: OrderService,
        // private config: NewConfigService, // private service2: QualysDBService, // private service: QualysService, // private sservice: ScheduleService
      ) {}
    
      @Post('/getOrders')
      @HttpCode(200)
      @ApiPaginatedResponse(ListOrderDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(OrderDto, PaginatedRequestDto)
      async getUsers(@Body() listOrderDto: PaginatedRequestDto<ListOrderDto>): Promise<PaginatedDto<Order>> {
        return this.userService.findAll(listOrderDto)
      }

      @Post('/addOrder')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(OrderDto, PaginatedRequestDto)
      async addUser(@Body() orderDto: CreateOrderDto): Promise<PaginatedDto<Order>> {
        return this.userService.createOrder(orderDto)
      }

      @Post('/updateOrder')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(OrderDto, PaginatedRequestDto)
      async updateUser(@Body() updateUserDto: UpdateOrderDto): Promise<PaginatedDto<Order>> {
        return this.userService.updateUser(updateUserDto)
      }
}
