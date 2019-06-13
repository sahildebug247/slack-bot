import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './db/db'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  sequelize
  .sync()
  // .sync({force:true})
  .then(result=>{
    // console.log(result)
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
