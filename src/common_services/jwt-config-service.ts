import { JwtModuleOptions, JwtOptionsFactory, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { join } from 'path';
import * as fs from 'fs';

const secretKeyFilePath         = "/config/certs/secret.pem";

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    throw new Error("Method not implemented.");
  }
  createJwtSignOptions(): JwtSignOptions {
    return {
      secret: this.getAppSecretKey()
    };
  }

  createJwtVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.getAppSecretKey()
    };
  }

  /**
     * This function will read "secret.pem"  file and return secretkey
     * @param {*} functionName 
     */
   getAppSecretKey() {
    try {
        var absolutePathForSecretKey    = join(process.cwd(), secretKeyFilePath);
        var key                         = fs.readFileSync(absolutePathForSecretKey, "utf8");
        return key;
    } catch (error) {
        // return Constant.APP_CONSTANT.NULL;
    }
  }
}