import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsNumber, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
// import { GetSurveyRequestDto } from "src/survey/dtos/get-survey-request.dto";
import { UserDto } from "src/users/dtos/user.dto";
// import { UpdateSurveyStatusDto } from "src/survey/dtos/update-survey-status.dto";
import { PageOptionsDto } from "./page-options.dto";

export class NonPaginatedRequestDto<TData> {
    @ApiProperty()
    @ValidateNested({each: true})
    // @Type(() => DtoType, {
    //     discriminator: {
    //         property: 'dtoType',
    //         subTypes: [
    //             {
    //                 value: GetSurveyRequestDto,
    //                 name: 'GetSurveyRequestDto'   
    //             }
    //         ]
    //     }
    // })
    // @Type(() => AllRequestDto)
    @IsNotEmpty()
    // readonly Payload: GetSurveyRequestDto | CreateSurveyDto | UpdateSurveyStatusDto | SurveyDto ;
    readonly Payload: TData

    @ApiProperty()
    @IsNotEmpty()
    readonly Token: string;

    readonly RefreshedToken: string;

    readonly FunctionName: string;

    // @ApiPropertyOptional()
    // public PageOptions: PageOptionsDto;

    constructor(data: TData, token: string) {
        this.Payload = data;
        this.Token = token;
    }

}