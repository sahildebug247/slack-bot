import {Table, Column, Model, ForeignKey, BelongsTo, AllowNull, IsDate, Is, DataType} from 'sequelize-typescript';
import Employee from './Employee';



@Table({
  timestamps: true,
})
export default class Attendance extends Model<Attendance> {

  //Attributes
  @IsDate
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  date:Date

  @IsDate
  @AllowNull(false)
  @Column
  entryTime:Date

  @IsDate
  @Column
  exitTime:Date

  
  @AllowNull(false)
  @Column
  onLeave:boolean

  //Assocations 



  @ForeignKey(() => Employee)
  @AllowNull(false)
  @Column
  empId: number;
  
  @BelongsTo(() => Employee)
  employee: Employee;
}