import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ResponseDto {
    
    @ApiProperty()
    public Success: number;

    @ApiProperty()
    public Message: string;

    @ApiProperty()
    public Token: string;

    @ApiProperty({ isArray: true })
    public Error: string[];

    constructor(success: number, message: string, token: string, error: string[]) {
        this.Success = success;
        this.Message = message;
        this.Token = token;
        this.Error = error;
    }

}