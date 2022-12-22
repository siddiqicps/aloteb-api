import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
// import { SurveyStatusDto } from "./survey-status.dto";

export class ListUserDto {
    @ApiProperty()
    public uid: number;
    
    @ApiProperty()
    public username: string;

    @ApiProperty()
    public password: string;

    @ApiProperty()
    public role_ids: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public contact_no: number;

    // @ApiProperty()
    // public IsDeleted: boolean;

    // @ApiProperty({ type: SurveyStatusDto })
    // public SurveyStatus: SurveyStatusDto; 

}