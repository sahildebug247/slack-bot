import { Injectable } from '@nestjs/common';
import ReturnVal from './returnVal';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';
import Employee from '../db/models/Employee';

@Injectable()
export class EmployeeService {


    async createOne(createDto:CreateEmployeeDto):Promise<ReturnVal>{
        try{
            const newEmp= await Employee.create(createDto);
            return ReturnVal.success("Record Created", newEmp, 200);
        
        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }


    async findOne(id:string):Promise<ReturnVal>{
        try{
            const recordDb= await Employee.findByPk(id);
            if(recordDb===null){
                return ReturnVal.error('No employee record found with the given details',
                                        404                                
                                    );   
            }else{
                return ReturnVal.success(recordDb,200);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }

    async findAll():Promise<ReturnVal>{
        try{
            const recordsDb= await Employee.findAll();
            if(recordsDb===null){
                return ReturnVal.error("No employee exists",404);
            }else{
                return ReturnVal.success("Records Found",recordsDb,200);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }

}
