import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { UserDto } from "./user.dto";
// import { SurveyStatusDto } from "./survey-status.dto";

export class LoginUserDto extends PickType(UserDto, ['username','password'] as const) {
    
}