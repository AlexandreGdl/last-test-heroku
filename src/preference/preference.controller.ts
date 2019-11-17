import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import {PreferenceService} from './preference.service';

@Controller('preference')
export class PreferenceController {
    constructor(private readonly preferenceService: PreferenceService) {}


   

}
