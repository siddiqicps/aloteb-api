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
import { UpdateUserDto } from './dtos/update-user.dto';
import { Role } from 'src/entity/Role';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private _userRepository: Repository<User>,
        @InjectRepository(Role)
        private _roleRepository: Repository<Role>,
        private jwtService: JwtService,
        private jwtConfigService: JwtConfigService
    ){}
    
    async findAll(listUserDto: PaginatedRequestDto<ListUserDto>): Promise<any> {
        const queryBuilder = this._userRepository.createQueryBuilder()
                                .select(["uid as uid","name as name","username as username","role.role_title"])
                                .innerJoinAndSelect("roles", "role","role.role_id = user.role_id");
        const itemCount = await queryBuilder.getCount();
        let  entities  = await queryBuilder.getRawMany();
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
            return {name: user.name, role_id: user.role_id, last_login_time: user.last_login_time, access_token: token};
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

    async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
        const saltRounds = 10;
        const user: User = new User();
        user.name = updateUserDto?.name
        user.email = updateUserDto?.email;
        user.username = updateUserDto?.username
        user.password = updateUserDto?.password ? bcrypt.hashSync(updateUserDto?.password, saltRounds) : undefined;
        user.role_id = updateUserDto?.role_id
        user.contact_no = updateUserDto?.contact_no
        
        const updatedUser = this._userRepository
                            .createQueryBuilder('users')
                            .update(User)
                            .set(user)
                            .where("uid = :id", { id: updateUserDto?.uid })
                            .execute()
        return updatedUser;
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

    async findAllRoles(listUserDto: PaginatedRequestDto<ListUserDto>): Promise<any> {
        const queryBuilder = this._roleRepository.createQueryBuilder()
                                // .select(["r.role_id as role_id","r.role_title as role_title"])
        const itemCount = await queryBuilder.getCount();
        let  { entities }  = await queryBuilder.getRawAndEntities();
        return entities;
    }
}
