import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsDefined, Length, MinLength, ArrayNotEmpty } from "class-validator";

export class OrderDto {
    @ApiProperty()
    @IsDefined({ message: 'First name required' })
    @IsNotEmpty()
    @IsString()
    @Length(8, 30,{ message: 'First name must be between 8 to 30 characters long' })
    // @IsNumber({allowNaN: false},{ message: 'Survey id must be a number' })
    public customer_first_name: string;
    
    @ApiProperty()
    @IsDefined({ message: 'Last name is required' })
    @IsNotEmpty()
    @IsString()
    @Length(8, 30,{ message: 'Last name must be between 8 to 30 characters long' })
    public customer_last_name: string;

    @ApiProperty()
    @IsDefined({ message: 'Status is required' })
    @IsString()
    @Length(6, 50,{ message: 'Status must be between 6 to 50 characters long' })
    public status: string;

    
    @ApiProperty()
    @IsDefined({ message: 'Item count is required' })
    public total_item_count: number;

    @ApiProperty()
    public base_sub_total: number;

    @ApiProperty()
    public base_grand_total: number;

    @ApiProperty()
    public created_at: string;

    @ApiProperty()
    public updated_at: string;

    // @ApiProperty()
    // public IsDeleted: boolean = false;

    
    
    // //@ApiProperty()
    // public CreatedBy: string;

}