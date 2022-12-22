import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { UserDto } from "./user.dto";

export class CreateUserDto  extends UserDto{
    

}