import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";
import { ResponseDto } from "./response.dto";


export class NonPaginatedDto<TData> {
    @ApiProperty({ isArray: true })
    @IsArray()
    readonly Results: TData[];

    @ApiProperty({ type: () => ResponseDto })
    readonly Response: ResponseDto;

    constructor(data: TData[], response: ResponseDto) {
        this.Results = data;
        this.Response = response;
    }
}