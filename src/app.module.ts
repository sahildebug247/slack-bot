import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './employee/employee.controller';
import { AttendanceController } from './attendance/attendance.controller';
import { EmployeeService } from './employee/employee.service';
import { AttendanceService } from './attendance/attendance.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeeController, AttendanceController],
  providers: [AppService,EmployeeService, AttendanceService],
})
export class AppModule {}
