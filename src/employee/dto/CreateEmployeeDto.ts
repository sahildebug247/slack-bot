export class CreateEmployeeDto{
    readonly firstName:string;
    readonly lastName:string;
    readonly age:string;
    readonly email:string;
    readonly phone:number;
    readonly address:string;
    readonly joinDate:string;
    readonly managerId?:string;
}