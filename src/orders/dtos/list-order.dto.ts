import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
// import { SurveyStatusDto } from "./survey-status.dto";

export class ListOrderDto {
    @ApiProperty()
    public order_id: number;
    
    @ApiProperty()
    public customer_first_name: string;
    
    @ApiProperty()
    public customer_last_name: string;

    @ApiProperty()
    public status: string;

    @ApiProperty()
    public total_item_count: number;

    @ApiProperty()
    public base_sub_total: number;

    @ApiProperty()
    public base_grand_total: number;

    @ApiProperty()
    public created_at: string; 

}