import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { NonPaginatedRequestDto } from "src/common_dto/nonpaginated-request.dto";
import { PaginatedRequestDto } from "src/common_dto/paginated-request.dto";
import { UserDto } from "src/users/dtos/user.dto";

export const ApiRequestPayload = <PModel extends Type<any>, MModel extends Type<any>>(
    payloadModel: PModel,
    metaModel: MModel,
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedRequestDto),
        ApiExtraModels(NonPaginatedRequestDto),
        ApiExtraModels(UserDto),
        ApiBody({
            schema: {
                allOf: [
                    { 
                        $ref: getSchemaPath(metaModel) 
                    },
                    {
                        properties: {
                            Payload: {
                                 $ref: getSchemaPath(payloadModel),
                            },
                        },
                    },
                ],
            },
        }),
    );
};