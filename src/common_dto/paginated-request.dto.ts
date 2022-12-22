import { Type } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { PageOptionsDto } from "./page-options.dto";

export class PaginatedRequestDto<TData> {
    @ApiProperty()
    @IsNotEmpty()
    readonly Payload: TData;

    @ApiProperty()
    @IsNotEmpty()
    readonly Token: string;

    @ApiPropertyOptional({ type: () => PageOptionsDto })
    readonly PageOptions: PageOptionsDto;

    readonly RefreshedToken: string;

    readonly FunctionName: string;

    constructor(data: TData, token: string, meta: PageOptionsDto) {
        this.Payload = data;
        this.Token = token;
        this.PageOptions = meta;

    }

}