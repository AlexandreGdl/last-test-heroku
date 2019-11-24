import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';

import {PreferenceService} from './preference.service';

@Controller('preference')
export class PreferenceController {
    constructor(private readonly preferenceService: PreferenceService) {}

    @Get(':id')
    async findPreference(
        @Param('id') preferenceId: string
    ): Promise<any>{
        const result = await this.preferenceService.findPreference(preferenceId);
        return result;
    }

    @Post('/update')
    async updatePreference(
        @Body('num_ligne') updatedNumLigne: string,
        @Body('arret') updatedArret: string,
        @Body('user_id') user_id: string,
    ): Promise<any> {
        console.log(updatedNumLigne);
        console.log(updatedArret);
        console.log(user_id);
        const result = await this.preferenceService.updatePreference(user_id, updatedNumLigne,updatedArret);
        return result;
    }

    @Put('/create/:id')
    async createPreference(
        @Param('id') preferenceId: string
    ): Promise<any>{
        console.log('CREATING PREFERENCE WITH' + preferenceId)
        const result = await this.preferenceService.createPreference(preferenceId);
        return result;
    }

}
