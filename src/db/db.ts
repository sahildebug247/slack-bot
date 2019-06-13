import {Sequelize} from 'sequelize-typescript';
import User from './models/Employee';
import Attendance from './models/Attendance';
import { development } from './config/Config';
import Organization from './models/Organization';
// const sequelize =  new Sequelize(
//   development.name,
//   development.user,
//   development.password,
//   {
//     dialect: 'postgres',
//     host: process.env.DB_HOST,
//   },
// );

const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:development.storage
})
sequelize.addModels([User,Attendance,Organization])

export default sequelize;