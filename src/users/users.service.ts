import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedRequestDto } from 'src/common_dto/paginated-request.dto';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { ListUserDto } from './dtos/list-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from 'src/common_services/jwt-config-service';
import { CreateUserDto } from './dtos/create-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private _userRepository: Repository<User>,
        private jwtService: JwtService,
        private jwtConfigService: JwtConfigService
    ){}
    
    async findAll(listUserDto: PaginatedRequestDto<ListUserDto>): Promise<any> {
        const queryBuilder = this._userRepository.createQueryBuilder("user");
        const itemCount = await queryBuilder.getCount();
        let { entities } = await queryBuilder.getRawAndEntities();
        return entities;
    }

    async userLogin(loginUserDto: LoginUserDto): Promise<any> {
        const username = loginUserDto.username;
        const pass = loginUserDto.password;
        const saltOrRounds = 10;
        const user = await this._userRepository.findOne({where:{username:username}})

        if (!user || !bcrypt.compareSync(pass, user.password)) {
            // authentication failed
            return false;
        } else {
            // authentication successful
            const payload = {
                                uid: user.uid, 
                                username: user.username, 
                                role_id: user.role_id, 
                                name: user.name, 
                                email: user.email,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60)
                            }
            const token = this.jwtService.sign(payload, this.jwtConfigService.createJwtSignOptions())
            const updatedUser = this._userRepository.update({uid: user.uid}, {access_token: token});
            return {name: user.name, last_login_time: user.last_login_time, access_token: token};
        }
    }

    async createUser(userDto: CreateUserDto): Promise<any> {
        const saltRounds = 10;
        const user: User = new User();
        user.name = userDto?.name
        user.email = userDto?.email;
        user.username = userDto?.username
        user.password = bcrypt.hashSync(userDto?.password, saltRounds);
        user.role_id = userDto?.role_id
        user.contact_no = userDto?.contact_no
        
        const savedUser = this._userRepository.save(user);
        return savedUser;
    }

    async deleteUser(deleteUserDto: DeleteUserDto): Promise<any> {
        const deletedUser = await this._userRepository
                            .createQueryBuilder('users')
                            .delete()
                            .from(User)
                            .where("uid = :id", { id: deleteUserDto?.uid })
                            .execute()
        return deletedUser;
    }
}