import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { OrderDto } from "./order.dto";

export class CreateOrderDto  extends OrderDto{
    

}