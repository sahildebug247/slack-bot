import { Injectable } from '@nestjs/common';
import ReturnVal from '../returnVal';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';
import Employee from '../db/models/Employee';
import { ManagerUpdateDto } from './dto/ManagerUpdateDto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdateDto';
import Organization from '../db/models/Organization';

@Injectable()
export class EmployeeService {
    async createMultiple(createDto:any):Promise<ReturnVal>{
        try{
            // console.log(createDto)
            const {orgId} = createDto;
            const orgRecord = await Organization.findByPk(orgId);
            if(!orgRecord || orgRecord === undefined || Object.entries(orgRecord).length === 0){
                return ReturnVal.error("Organization not found");
            }else{
                const {members} = createDto;
                console.log(members)
                const empRecords = await Employee.bulkCreate(members,{validate:true});
                if(empRecords.length === 0){
                    return ReturnVal.error("Something went wrong")
                }
                
                // const empRecords = await Employee.create(createDto);
                return ReturnVal.success("Records Crearted", empRecords)
            }
        }catch(e){
            console.log(e)
            return ReturnVal.error(e.errors,400);
        }
    }

    async createOne(createDto:CreateEmployeeDto):Promise<ReturnVal>{
        try{
            if(createDto.managerId!=null){
                const managerResponse= await this.findOne(createDto.managerId)
                if(managerResponse.success){
                    const newEmp= await Employee.create(createDto);
                    return ReturnVal.success("Record Created", newEmp, 200);
                }else{
                    managerResponse.message="Invalid Manager Id";
                    return managerResponse;
                }
            }else{
                const newEmp= await Employee.create(createDto);
                return ReturnVal.success("Record Created", newEmp, 200);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }


    async findOne(id:string):Promise<ReturnVal>{
        try{
            const recordDb= await Employee.findByPk(id);
            if(recordDb===null){
                return ReturnVal.error('No employee record found with the given details',
                                        404);   
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
            if(recordsDb===null || recordsDb.length === 0){
                return ReturnVal.error("No employee exists",404);
            }else{
                return ReturnVal.success("Records Found",recordsDb);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }
    async findAllOrg(orgIdDto:any):Promise<ReturnVal>{
        try{
            const {orgId} = orgIdDto
            if(orgId === undefined || orgId === '' || orgId === null){
                return ReturnVal.error("Invalid Organization Details",404);
            }
            const recordsDb= await Employee.findAll({where:{orgId}});
            if(recordsDb===null || recordsDb===undefined|| recordsDb.length === 0){
                return ReturnVal.error("No employee exists",[],404,);
            }else{
                return ReturnVal.success("Records Found",recordsDb);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }


    async update(id:string,employeeUpdate:EmployeeUpdateDto):Promise<ReturnVal>{
        try{

            //fields not to be updated using this route, even if they are sent this will drop them
            delete employeeUpdate['managerId'];
            delete employeeUpdate['id'];
            delete employeeUpdate['joinDate'];

            const updatedEmp= await Employee.update({...employeeUpdate},{where:{id}});

            if(updatedEmp==null || !updatedEmp){
                return ReturnVal.error("Invalid data passed",400); 
            }else{
                return ReturnVal.success("Record Updated",updatedEmp);
            }
        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }

    async managerUpdate(managerUpdateDto:ManagerUpdateDto):Promise<ReturnVal>{
        try{          
            const empRecord  = await Employee.findByPk(managerUpdateDto.id);
            const managerRecord = await Employee.findByPk(managerUpdateDto.managerId);
            if(empRecord==null || managerRecord == null || managerUpdateDto.id == managerUpdateDto.managerId){
                return ReturnVal.error("Invalid manager id or employee id",400);
            }else{
                const updateResponse=await Employee.update({managerId:managerUpdateDto.managerId},{where:{id:managerUpdateDto.id}});
                return ReturnVal.success("Updated",updateResponse);
            }

        }catch(e){
            return ReturnVal.error(e.errors,400); 
        }
    }
}
