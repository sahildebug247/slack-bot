export class CreateEmployeeDto{
    readonly firstName:string;
    readonly lastName:string;
    readonly email:string;
    readonly phone:number;
    readonly joinDate:string;
    readonly managerId?:string;
    readonly organizationID?:string;
    readonly slackId:string;
}