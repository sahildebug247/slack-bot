import {Table, Column, Model,DataType, HasMany, AllowNull, AutoIncrement, PrimaryKey, Length, IsEmail, IsNumeric, IsDate, Unique} from 'sequelize-typescript';

import Employee from './Employee';


@Table({
  timestamps: true,
})
export default class Organization extends Model<Organization> {

  //Attributes
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @Length({min:2,max:100})
  @AllowNull(false)
  @Column
  name:string

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email:string

  @AllowNull(false)
  @Length({min:6,max:200})
  @Column
  password:string

  //Associations

  @HasMany(() => Employee)
  Employee: Employee[];
}