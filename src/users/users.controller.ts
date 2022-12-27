import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaginatedRequestDto } from 'src/common_dto/paginated-request.dto';
import { PaginatedDto } from 'src/common_dto/pagination.dto';
import { ResponseDto } from 'src/common_dto/response.dto';
import { ApiPaginatedResponse } from 'src/custom_decorators/pagination.decorator';
import { ApiRequestPayload } from 'src/custom_decorators/request-payload.decorator';
import { User } from 'src/entity/User';
import { CreateUserDto } from './dtos/create-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { ListUserDto } from './dtos/list-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService,
        // private config: NewConfigService, // private service2: QualysDBService, // private service: QualysService, // private sservice: ScheduleService
      ) {}
    
      @Post('/getUsers')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async getUsers(@Body() listUserDto: PaginatedRequestDto<ListUserDto>): Promise<PaginatedDto<User>> {
        return this.userService.findAll(listUserDto)
      }

      @Post('/addUser')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async addUser(@Body() userDto: CreateUserDto): Promise<PaginatedDto<User>> {
        return this.userService.createUser(userDto)
      }

      @Post('/updateUser')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<PaginatedDto<User>> {
        return this.userService.updateUser(updateUserDto)
      }

      @Post('/login')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async userLogin(@Body() loginUserDto: LoginUserDto): Promise<PaginatedDto<User>> {
        return this.userService.userLogin(loginUserDto)
      }

      @Post('/deleteUser')
      @HttpCode(200)
      @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async deleteUser(@Body() deleteUserDto: DeleteUserDto): Promise<PaginatedDto<User>> {
        return this.userService.deleteUser(deleteUserDto)
      }

      @Post('/getRoles')
      @HttpCode(200)
      // @ApiPaginatedResponse(ListUserDto, PaginatedDto, ResponseDto)
      @ApiRequestPayload(UserDto, PaginatedRequestDto)
      async getRoles(@Body() listUserDto: PaginatedRequestDto<ListUserDto>): Promise<PaginatedDto<any>> {
        return this.userService.findAllRoles(listUserDto)
      }

}
