import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt, VarifiedCallback } from "passport-jwt";
import keys from "../keys";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretorKey: keys.jsonKey
        })
    }

    async validate(payload:any, done: VarifiedCallback){
        return done(null, user, payload.iat);
    }
}