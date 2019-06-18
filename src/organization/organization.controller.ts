import { Controller, Post, Body } from '@nestjs/common';
import CreateOrganizationDto from './dto/CreateOrganizationDto';
import { OrganizationService } from './organization.service';
import ReturnVal from '../returnVal';
import LoginOrganizationDto from './dto/LoginOrganizationDto';

@Controller('organization')
export class OrganizationController {


    constructor(private readonly organizationService:OrganizationService){}
    // @route /organization/signup
    // desc: creates a new organization
    // access: public
    @Post('signup')
    async signup(@Body() createOrganizationDto: CreateOrganizationDto):Promise<ReturnVal>{
        return await this.organizationService.createOrg(createOrganizationDto);
    }

    // @route /organization/signin
    // desc: creates a access token
    // access: public
    @Post('signin')
    async signin(@Body() loginOrganizationDto: LoginOrganizationDto):Promise<ReturnVal>{
        return await this.organizationService.signIn(loginOrganizationDto);
    }



}
