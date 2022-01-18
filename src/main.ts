import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"



async function start (){
 const PORT = process.env.PORT || 5000 ; 

 const app = await NestFactory.create(AppModule)
 
 const config = new DocumentBuilder()
    .setTitle('Nest-Api')
    .setDescription('Create Auth flow by Nestjs')
    .setVersion('1.0.0')
    .addTag('Ram3es')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);



 await  app.listen(PORT, () => console.log(`Server has been run successfully! PORT: ${PORT}`)
 )
}

start()