import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';

import { EmployeeService } from './employee.service';
import ReturnVal from './returnVal';
@Controller('emp')
export class EmployeeController {


    constructor(private readonly employeeService:EmployeeService){}

    // @route /emp/
    // desc: inserts a new employee into record
    // access: public
    @Post()
    async create(@Body() createEmployeeDto: CreateEmployeeDto):Promise<ReturnVal>{
        return await this.employeeService.createOne(createEmployeeDto);
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
