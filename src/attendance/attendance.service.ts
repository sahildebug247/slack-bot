import { Injectable } from '@nestjs/common';
import ReturnVal from '../returnVal';
import Employee from '../db/models/Employee';
import { AttendanceSlackIdDto } from './dto/attendanceSlackIdDto';
import { AttendanceMonthDto } from './dto/AttendanceMonthDto';
import { AttendanceEmpDateDto } from './dto/AttendanceEmpDateDto';
import { AttendanceRecordRes } from './interfaces/AttendanceRecordRes'
import { Datehelper } from './helpers/DateHelper';
import Attendance from '../db/models/Attendance';
import Sequelize from 'sequelize';




@Injectable()
export class AttendanceService {


    async createEntry(attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        try{
            const dateHelper = new Datehelper();
            console.log(dateHelper.fullDate())
            const {slackId} = attendanceSlackIdDto;
            if(slackId==null || slackId==undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }
            const empRecord = await Employee.findOne({where:{slackId}});
            if(!empRecord || empRecord == null || empRecord == undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }else{
                const previousRecord = await Attendance.findOne({where:{empId:empRecord.id,date:dateHelper.fullDate()}});
                if(previousRecord){
                    return ReturnVal.error("Already Marked Present",previousRecord,200);
                }
                const attendanceRecord = await Attendance.create({
                    entryTime:dateHelper.fullDateTime(),
                    empId:empRecord.id,
                    onLeave:false,
                    date:dateHelper.fullDate()
                });

                return ReturnVal.success("Marked present", attendanceRecord, 200);
            }

        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }

    async createExit(attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        try{
            const dateHelper = new Datehelper();
            const {slackId} = attendanceSlackIdDto;
            if(slackId==null || slackId==undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }
            const empRecord = await Employee.findOne({where:{slackId}});
            
            if(!empRecord || empRecord == null || empRecord == undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }else{
                const {id} = empRecord;
                const attendanceRecord = await Attendance.findOne({where:{empId:id,date:dateHelper.fullDate()}});
                
                if(!attendanceRecord || attendanceRecord==null){
                    return ReturnVal.error("Employee was not marked present, cannot set exit time");
                }else if(attendanceRecord.dataValues.exitTime!=null){
                    return ReturnVal.error("Exit time already marked");
                }else{
                    const updateExit = await Attendance.update({exitTime:dateHelper.fullDateTime()}, {where:{empId:id, date:dateHelper.fullDate()}});
                    return ReturnVal.success("Exit time marked", updateExit);
                }
            }
        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }

    async empCurrentMonth(attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        try{
            
            const dateHelper = new Datehelper();
            const {Op} = Sequelize;
            const {slackId} = attendanceSlackIdDto;
            if(slackId==null || slackId==undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }
            const empRecord = await Employee.findOne({where:{slackId}});
            
            if(!empRecord  || empRecord == undefined ){
                return ReturnVal.error("Invalid Slack Id", 400);
            }else{
                const {id} = empRecord;
                let query = {
                    where:{
                        empId:id,
                        date:{
                            [Op.gte]:dateHelper.startOfCurrentMonth(),
                            [Op.lte]:dateHelper.endOfCurrentMonth()
                        }
                    }
                };
                const attendanceRecord = await Attendance.findAll(query);
                if(!attendanceRecord || attendanceRecord.length === 0 || attendanceRecord === {} || attendanceRecord === null){
                    return ReturnVal.error("No attendance record exist for the current month");
                }else{
                    let noOfLeaves = 0
                    let avgLateBy = 0;
                    let avgWorkingTime = 0;
                    let attendanceRecordRes:AttendanceRecordRes[] = [];
                    attendanceRecord.forEach(attendance => {
                            const {date,entryTime,exitTime,onLeave} = attendance;
                            if(onLeave)
                                noOfLeaves++;
                            console.log(entryTime)
                            const lateBy = dateHelper.lateBy(entryTime);
                            console.log('lateBy:', lateBy)
                            avgLateBy+= lateBy;
                            const workingTime = dateHelper.workingTime(entryTime,exitTime);
                            avgWorkingTime+=workingTime;
                            attendanceRecordRes.push({date,entryTime,exitTime,onLeave,lateBy:`${lateBy} min`,workingTime});
                    });
                    const attendanceRecordLen=attendanceRecord.length;
                    avgLateBy= avgLateBy/attendanceRecordLen;
                    avgWorkingTime= avgWorkingTime/attendanceRecordLen;
                    noOfLeaves = dateHelper.noOfWeekDays(dateHelper.startOfCurrentMonth(),dateHelper.endOfCurrentMonth()) - attendanceRecordLen;
                    return ReturnVal.success("Records found", {attendanceRecordRes,noOfLeaves,AvgLateTime:`${avgLateBy} min`})
                }
            }
        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }


    async empRangeRecord(attendanceMonthDto:AttendanceMonthDto):Promise<ReturnVal>{
        try{
            const dateHelper = new Datehelper();
            const {Op} = Sequelize;
            const {slackId,startDate,endDate} = attendanceMonthDto;
            if(slackId==null || slackId==undefined|| startDate == undefined || endDate == undefined){
                return ReturnVal.error("Invalid Slack Id or start and end date", 400);
            }
            const empRecord = await Employee.findOne({where:{slackId}});
           
                
            if(!empRecord || empRecord == null || empRecord == undefined ){
                return ReturnVal.error("Invalid Slack Id", 400);
            }else{
                const {id} = empRecord;
                console.log('start ' , startDate)
                console.log('end ' , endDate)
                let query = {
                    where:{
                        empId:id,
                        date:{
                            [Op.gte]:new Date(startDate),
                            [Op.lt]:new Date(endDate),
                        }
                    }
                };
                const attendanceRecord = await Attendance.findAll(query);
                if(!attendanceRecord || attendanceRecord.length === 0 || attendanceRecord === {} || attendanceRecord === null){
                    return ReturnVal.error("No attendance record exist for the current month");
                }else{
                    let noOfLeaves = 0
                    let avgLateBy = 0;
                    let avgWorkingTime = 0;
                    let attendanceRecordRes:AttendanceRecordRes[] = [];
                    attendanceRecord.forEach(attendance => {
                            const {date,entryTime,exitTime,onLeave} = attendance;
                            if(onLeave)
                                noOfLeaves++;
                            const lateBy = dateHelper.lateBy(entryTime);
                            avgLateBy+= lateBy;
                            const workingTime = dateHelper.workingTime(entryTime,exitTime);
                            avgWorkingTime+=workingTime;
                            attendanceRecordRes.push({date,entryTime,exitTime,onLeave,lateBy:`${lateBy} min`,workingTime});
                    });
                    const attendanceRecordLen=attendanceRecord.length;
                    avgLateBy= avgLateBy/attendanceRecordLen;
                    avgWorkingTime= avgWorkingTime/attendanceRecordLen;
                    noOfLeaves =  dateHelper.noOfWeekDays(startDate,endDate) - attendanceRecordLen;
                    return ReturnVal.success("Records found", {attendanceRecordRes,noOfLeaves,AvgLateTime:`${avgLateBy} min`})
                }
            }

        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }

    async dateRecords(date:string):Promise<ReturnVal>{
        try{
            const attendanceRecords = await Attendance.findAll({where:{date}});
            if(!attendanceRecords || attendanceRecords.length == 0){
                return ReturnVal.error("Bad Request or no records exists for the specified date.");
            }else{
                return ReturnVal.success("Records Found", attendanceRecords)
            }
        }catch(e){
            return ReturnVal.error(e.errors,400);
        }
    }


    async empDateRecord(attendanceEmpDateDto:AttendanceEmpDateDto):Promise<ReturnVal>{
        try{
            const dateHelper = new Datehelper();
            const {slackId,date} = attendanceEmpDateDto;
            if(slackId==null || slackId==undefined){
                return ReturnVal.error("Invalid Slack Id", 400);
            }
            const empRecord = await Employee.findOne({where:{slackId}});
            
            if(!empRecord  || empRecord == undefined || date == undefined){
                return ReturnVal.error("Invalid Date or Slack Id", 400);
            }else{
                const {id} = empRecord.id;
                const attendanceRecord = await Attendance.findOne({where:{empId:id,date}});
                if(!attendanceRecord || attendanceRecord == {} || attendanceRecord.length === 0){
                    return ReturnVal.error("No Record found");
                }else{
                    return ReturnVal.success("Record found", attendanceRecord)
                }
            }
        }catch(e){
            return ReturnVal.error(e.errors,400);  
        }
    }

}
