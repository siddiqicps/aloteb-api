import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";
import { ResponseDto } from "./response.dto";


export class PaginatedDto<TData> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly Results: TData[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly Meta: PageMetaDto;

    @ApiProperty({ type: () => ResponseDto })
    readonly Response: ResponseDto;

    constructor(data: TData[], meta: PageMetaDto, response: ResponseDto) {
        this.Results = data;
        this.Meta = meta;
        this.Response = response
    }
}