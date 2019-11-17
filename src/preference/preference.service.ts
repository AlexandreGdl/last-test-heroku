import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { Preference } from './preference.model';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<Preference>,
  ) {}

 

}
