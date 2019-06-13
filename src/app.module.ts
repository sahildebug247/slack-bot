import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './employee/employee.controller';
import { AttendanceController } from './attendance/attendance.controller';
import { EmployeeService } from './employee/employee.service';
import { AttendanceService } from './attendance/attendance.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeeController, AttendanceController, OrganizationController],
  providers: [AppService,EmployeeService, AttendanceService, OrganizationService],
})
export class AppModule {}
