import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsDefined } from "class-validator";
import { OrderDto } from "./order.dto";

export class DeleteUserDto  extends OrderDto{
    @ApiProperty()
    @IsDefined({ message: 'Order Id is required' })
    public order_id: number;
}