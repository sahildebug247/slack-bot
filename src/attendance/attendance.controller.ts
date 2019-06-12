import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceSlackIdDto } from './dto/attendanceSlackIdDto';
import ReturnVal from '../returnVal';
import { AttendanceMonthDto } from './dto/AttendanceMonthDto';

@Controller('attendance')
export class AttendanceController {


    constructor(private readonly attendanceService:AttendanceService){}

    // @route /attendance/create-entry
    // desc: inserts a new attendance record
    // access: public
    @Post('create-entry')
    async createEntry(@Body() attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        return await this.attendanceService.createEntry(attendanceSlackIdDto);
    }
    
    // @route /attendance/create-entry
    // desc: inserts a new attendance record
    // access: public
    @Post('create-exit')
    async createExit(@Body() attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        return await this.attendanceService.createExit(attendanceSlackIdDto);
    }

    // @route /attendance/emp-current-month
    // desc: fetches attendance records for the current month for an employee
    // access: public
    @Post('emp-current-month')
    async empCurrentMonth(@Body() attendanceSlackIdDto:AttendanceSlackIdDto):Promise<ReturnVal>{
        return await this.attendanceService.empCurrentMonth(attendanceSlackIdDto);
    }
    // @route /attendance/emp-range
    // desc: fetches all attendance records for the passed date range for an employee
    // access: public
    @Post('emp-range')
    async empRangeRecord(@Body() attendanceMonthDto:AttendanceMonthDto):Promise<ReturnVal>{
        return await this.attendanceService.empRangeRecord(attendanceMonthDto);
    }

    // @route date-records/:date
    // desc: fetches all records for  a date
    // access: public
    @Get('date-records/:date')
    async dateRecords(@Param('date') date:string):Promise<ReturnVal>{
        return await this.attendanceService.dateRecords(date);
    }






}
