import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PreferenceModule } from './preference/preference.module';

@Module({
  imports: [
    UserModule,
    PreferenceModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/mds-api', {useNewUrlParser: true}
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
