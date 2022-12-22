import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsDefined, Length, MinLength, ArrayNotEmpty } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsDefined({ message: 'username required' })
    @IsNotEmpty()
    @IsString()
    @Length(8, 30,{ message: 'Username name must be between 8 to 30 characters long' })
    // @IsNumber({allowNaN: false},{ message: 'Survey id must be a number' })
    public username: string;
    
    @ApiProperty()
    @IsDefined({ message: 'Password is required' })
    @IsNotEmpty()
    @IsString()
    @Length(8, 50,{ message: 'Password must be between 8 to 50 characters long' })
    public password: string;

    @ApiProperty()
    @IsDefined({ message: 'Role Ids are required' })
    public role_id: number;

    @ApiProperty()
    @IsDefined({ message: 'Name is required' })
    @IsString()
    @Length(6, 50,{ message: 'Name must be between 6 to 50 characters long' })
    public name: string;

    
    @ApiProperty()
    @IsDefined({ message: 'Email is required' })
    @Length(6, 64,{ message: 'Email must be between' })
    public email: string;

    @ApiProperty()
    @IsDefined({ message: 'Contact number is required' })
    @Length(10, 15,{ message: 'Contact number is required' })
    public contact_no: string;

    @ApiProperty()
    public status: number = 1;

    // @ApiProperty()
    // public IsDeleted: boolean = false;

    
    
    // //@ApiProperty()
    // public CreatedBy: string;

}