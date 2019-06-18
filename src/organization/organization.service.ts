import { Injectable } from '@nestjs/common';
import CreateOrganizationDto from './dto/CreateOrganizationDto'
import LoginOrganizationDto from './dto/LoginOrganizationDto'
import ReturnVal from '../returnVal';
import bcrypt from 'bcrypt'
import Organization from'../db/models/Organization'
import keys from '../keys'
import jwt from 'jsonwebtoken';


@Injectable()
export class OrganizationService {


    async createOrg(createOrganizationDto:CreateOrganizationDto):Promise<ReturnVal>{
        try{
            let {email,name,password} = createOrganizationDto;
            
            if(name === undefined || email === undefined || password === undefined){
                return ReturnVal.error("Email, name or password not specified");
            }else{
                name= name.toLowerCase();
                const hashedPass = await bcrypt.hash(password,12);
                const orgRecord = await Organization.create({name,email,password:hashedPass});
                if(orgRecord!== undefined || orgRecord.length!== 0){
                    const payload={id:orgRecord.id,email:orgRecord.email, name:orgRecord.name};
                    let token =     'Bearer '+
                                    jwt.sign(
                                        payload,
                                        keys.jsonKey,
                                        {expiresIn: 14400},
                                        );
                    console.log(token)
                    return ReturnVal.success("Organization Created",{token});
                }
            }

        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }

    async signIn(loginOrganizationDto:LoginOrganizationDto):Promise<ReturnVal>{
        try{
            const {email,password} = loginOrganizationDto;
            if(email === undefined || password === undefined){
                return ReturnVal.error("Email or password not specified");
            }else{
                const orgRecord = await Organization.findOne({where:{email}});
                console.log(orgRecord)
                if(!orgRecord || orgRecord === undefined || orgRecord.length === 0 || Object.entries(orgRecord).length === 0){
                    return ReturnVal.error("Invalid email")
                }else{
                    const compareResult = await bcrypt.compare(password,orgRecord.password);
                    if(compareResult){
                            console.log("inside")
                            const payload={id:orgRecord.id,email:orgRecord.email, name:orgRecord.name};
                            let token =     'Bearer '+
                                            jwt.sign(
                                                payload,
                                                keys.jsonKey,
                                                {expiresIn: 14400},
                                                );
                            return ReturnVal.success("Details Verified",{token});
                    }else{
                        return ReturnVal.error("Password not correct")
                    }
                }
            }

        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }

    async findByPayload(payload:any){
        const {or}
    }
}
