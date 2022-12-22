import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsDefined } from "class-validator";
import { UserDto } from "./user.dto";

export class UpdateUserDto  extends UserDto{
    @ApiProperty()
    @IsDefined({ message: 'User Id is required' })
    public uid: number;    

}