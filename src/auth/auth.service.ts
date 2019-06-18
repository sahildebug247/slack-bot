import { Injectable } from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import { OrganizationService } from '../organization/organization.service';
import keys from '../keys';

@Injectable()
export class AuthService {
    constructor(private orgService:OrganizationService){}

    async signPayload(payload:any){
        return sign(
            payload,
            keys.jsonKey,
            {expiresIn: '7d'},
            );
    }

    async validateOrganization(payload:any){
        return await this.orgService.findByPayload(payload)
    }
}
