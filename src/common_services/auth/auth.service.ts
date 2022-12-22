import { Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import * as fs from 'fs';

import { JwtService } from '@nestjs/jwt';
import { Constant } from 'src/config/constant';
import { JwtConfigService } from '../jwt-config-service';
import { from } from 'rxjs';
import { User } from 'src/entity/User';
import connectDB from "src/config/ormconfig";
import { RoleAction } from 'src/entity/RoleAction';

const secretKeyFilePath         = "/config/certs/secret.pem";

@Injectable()
export class AuthService {

    constructor(
        // private config: NewConfigService,
        private readonly jwtService: JwtService,
        private readonly jwtConfigService: JwtConfigService
        
      ) {}

      async verifyToken(reqBody, functionName): Promise<any> {
        let returnObj = {
          isValidToken: Constant.APP_CONSTANT.NULL,  
          isAuthorized: Constant.APP_CONSTANT.NULL
        }
        let token = reqBody.Token
        let validateFunction = Constant.APP_CONSTANT.ONE; //Routes.APP_ROUTES(functionName).validateFunction  
        functionName = functionName.substr(1, functionName.length-1)  
        let validateTokenResponseObj = this.jwtService.verify(token, this.jwtConfigService.createJwtVerifyOptions());
        if(validateTokenResponseObj){
            let userIdFromToken = validateTokenResponseObj.uid
            let userNameFromToken = validateTokenResponseObj.username
            let roleId = validateTokenResponseObj.role_id
            let isValidToken = await this.validateToken(token)
            returnObj.isValidToken = isValidToken
            /**
             * Authorizing user action
             */
            if(isValidToken && validateFunction) {
              let isAuthorized = await this.authorizeUserAction(functionName,roleId)
              returnObj.isAuthorized = isAuthorized
            }
        }
        return returnObj;
      }

    /**
     * This function will validate token in DB
     * @param {*} token 
     */
    async validateToken(token: string): Promise<boolean>{
        const queryBuilder = connectDB.createQueryBuilder()
                              .select("user")
                              .from(User, "user")
                              .where("user.access_token = :token", { token: token });
        const userCount = await queryBuilder.getCount();
        return !!userCount;
    }  

    /**
     * This function will authorize user action
     * @param {*} functionName
     * @param {*} roleId 
     */
    async authorizeUserAction(functionName: string, roleId: number) :Promise<boolean> {
      if(roleId === 1) return Constant.APP_CONSTANT.TRUE;
      const queryBuilder = connectDB.createQueryBuilder()
                              .select()
                              .from(RoleAction, "ra")
                              .where("ra.role_id = :roleId", { roleId: roleId })
                              .andWhere("ra.action = :action", {action: functionName});
        const userCount = await queryBuilder.getCount();
        return !!userCount;
    } 
  

}
