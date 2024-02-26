import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cneh3e8l5elc73dbflp0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'test_video_render_database_user',
      password: 'aDqRdFlUEsldqcgnsciqcsotlpSUVV0v',
      database: 'test_video_render_database',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
