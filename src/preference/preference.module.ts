import { Module } from "@nestjs/common";
import { PreferenceController } from "./preference.controller";
import { PreferenceService } from "./preference.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PreferenceSchema } from "./preference.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'User',schema: PreferenceSchema}])],
    controllers: [PreferenceController],
    providers: [PreferenceService]
})

export class PreferenceModule {}