import {Table, Column, Model,DataType, HasMany, AllowNull, AutoIncrement, PrimaryKey, Length, IsEmail, IsNumeric, IsDate, Unique, BelongsTo, ForeignKey} from 'sequelize-typescript';
import Attendance from './Attendance';
import Organization from './Organization';


@Table({
  timestamps: true,
})
export default class Employee extends Model<Employee> {

  //Attributes
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @Column
  slackId:string

  @Length({min:2,max:20})
  @AllowNull(false)
  @Column
  firstName:string

  
  @Length({min:2,max:20})
  @Column
  lastName:string


  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email:string

  @Length({min:10,max:15})
  @AllowNull(false)
  @Column(DataType.STRING)
  phone:number


  @IsNumeric
  @Column
  managerId:number
  
  //Associations

  @HasMany(() => Attendance)
  attendance: Attendance[];

  @ForeignKey(() => Organization)
  @AllowNull(false)
  @Column
  orgId: number;

  @BelongsTo(() => Organization)
  organization: Organization
}