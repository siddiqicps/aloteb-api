import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/common_services/auth/auth.service';
@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {

  constructor(
    // private config: NewConfigService,
    private readonly authService: AuthService
    
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authObj = await this.authService.verifyToken(req.body, req.path)
    console.log(authObj)
    res.status(200);
    if(authObj.isValiToken == false){
      return res.json({status: 0, msg: "Invalid access token"});
    }
    if(authObj.isAuthorized == false){
      return res.json({status: 0, msg: "Not authorized to perform this action"});
    }
    next();
  }
}
