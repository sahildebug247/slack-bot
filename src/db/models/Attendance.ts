import {Table, Column, Model, ForeignKey, BelongsTo, AllowNull, IsDate, Is} from 'sequelize-typescript';
import Employee from './Employee';
import { isBoolean } from 'util';


@Table({
  timestamps: true,
})
export default class Attendance extends Model<Attendance> {

    //Attributes

  @IsDate
  @AllowNull(false)
  @Column
  entryTime:Date

  @IsDate
  @AllowNull(false)
  @Column
  exitTime:Date

  
  @AllowNull(false)
  @Column
  onLeave:boolean

  //Assocations 

  @ForeignKey(() => Employee)
  @Column
  empId: number;
  
  @BelongsTo(() => Employee)
  Employee: Employee;
}