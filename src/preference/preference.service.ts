import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { Preference } from './preference.model';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel('Preference') private readonly preferenceModel: Model<Preference>,
  ) {}

 async createPreference(id_user: string,num_ligne: string = '4',arret: string = 'LE NOTRE'): Promise<any>{
    const preference = new this.preferenceModel({
      id_user,
      num_ligne,
      arret
    });
    console.log('-----Created Preference-------')
    console.log(preference);
    console.log('------------')
    preference.save();

    return {status: 201, msg: 'Preference Created'}
 }

 async updatePreference(
    id_user: string,
    num_ligne: string,
    arret: string,
  ): Promise<any> {
  const updatedPreference = await this.findPreference(id_user);
  console.log(updatedPreference)
  if (num_ligne) {
    updatedPreference[0].num_ligne = num_ligne;
  }
  if (arret) {
    updatedPreference[0].arret = arret;
  }
  updatedPreference[0].save();
  return {status: 201,msg:'Preference Updated'}
 }

 async findPreference(id:string): Promise<any>{
   console.log('im hereer')
   const preference = await this.preferenceModel.find({id_user: id});
   if (!preference[0]) {
    throw new NotFoundException('Could not find preference.');
   } else {
    return preference
   }
 }



}
