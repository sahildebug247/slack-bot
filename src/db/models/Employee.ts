import {Table, Column, Model,DataType, HasMany, AllowNull, AutoIncrement, PrimaryKey, Length, IsEmail, IsNumeric, IsDate, Unique} from 'sequelize-typescript';
import Attendance from './Attendance';


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

  @Length({min:4,max:20})
  @AllowNull(false)
  @Column
  firstName:string

  
  @Length({min:4,max:20})
  @AllowNull(false)
  @Column
  lastName:string

  
  @Length({min:4,max:7})
  @AllowNull(false)
  @Column
  gender:string

  @IsNumeric
  @AllowNull(false)
  @Column
  age:number

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email:string

  @Length({min:10,max:15})
  @AllowNull(false)
  @Column(DataType.STRING)
  phone:number

  @Length({min:10,max:100})
  @AllowNull(false)
  @Column(DataType.STRING(1234))
  address:string

  @IsDate
  @AllowNull(false)
  @Column
  joinDate:Date


  @IsNumeric
  @AllowNull(false)
  @Column
  managerId:number
  
  //Associations

  @HasMany(() => Attendance)
  attendance: Attendance[];
}