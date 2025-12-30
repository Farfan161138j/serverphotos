import { Module } from '@nestjs/common';
import { PhotosModule } from './modules/photos/photos.module';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [PhotosModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
