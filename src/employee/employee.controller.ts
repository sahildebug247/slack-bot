import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';

import { EmployeeService } from './employee.service';
import ReturnVal from '../returnVal';
import { ManagerUpdateDto } from './dto/ManagerUpdateDto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdateDto';
@Controller('emp')
export class EmployeeController {


    constructor(private readonly employeeService:EmployeeService){}

    // @route /emp/
    // desc: inserts a new employee into record
    // access: public
    @Post()
    async create(@Body() createEmployeeDto: any):Promise<ReturnVal>{
        return await this.employeeService.createMultiple(createEmployeeDto);
    }

    // @route /emp/all/org
    // desc: inserts a new employee into record
    // access: public
    @Post('/all/org')
    async findAllOrg(@Body() orgDto: any):Promise<ReturnVal>{
        return await this.employeeService.findAllOrg(orgDto);
    }
    
    // desc: updates manager id for an employee
    // access: public
    // @route /emp/update
    @Put('update/:id')
    async update(@Param('id') id:string,@Body() employeeUpdateDto:EmployeeUpdateDto):Promise<ReturnVal>{
        
        return await this.employeeService.update(id,employeeUpdateDto);
    }

    // desc: updates manager id for an employee
    // access: public
    // @route /emp/manager-update
    @Put('manager-update')
    async managerUpdate(@Body() managerUpdateDto:ManagerUpdateDto):Promise<ReturnVal>{
        
        return await this.employeeService.managerUpdate(managerUpdateDto);
    }
    
    // desc: finds am employee record by id
    // access: prublic
    // @route /emp/:id
    @Get(':id')
    async findOne(@Param('id') id:string):Promise<ReturnVal>{
        return await this.employeeService.findOne(id);
    }
    
    // desc: get records of all employees
    // access: prublic
    // @route /emp/
    @Get()
    async findAll():Promise<ReturnVal>{
        return await this.employeeService.findAll();
    }
    


    
}
