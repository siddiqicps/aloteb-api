import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { NonPaginatedDto } from "src/common_dto/non-pagination.dto";
import { PaginatedDto } from "src/common_dto/pagination.dto";
import { ResponseDto } from "src/common_dto/response.dto";
import { ListUserDto } from "src/users/dtos/list-user.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>, PModel extends Type<any>, RModel extends Type<any>>(
    model: TModel,
    pageModel: PModel,
    responseModel: RModel,
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedDto),
        ApiExtraModels(NonPaginatedDto),
        ApiExtraModels(ResponseDto),
        ApiExtraModels(ListUserDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { 
                        $ref: getSchemaPath(responseModel) 
                    },
                    { 
                        $ref: getSchemaPath(pageModel) 
                    },
                    {
                        properties: {
                            Results: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model)},
                            },
                        },
                    },
                ],
            },
        }),
    );
};