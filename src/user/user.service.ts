import { Injectable, NotFoundException, NotAcceptableException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<any>{
    return 'Getting all user'
  }

  async createUser(mail: string,nom: string,prenom: string,password: string): Promise<any>{
    let newUser: User;
    let result: any;
    await this.userModel.find({mail: mail}).then(
      data => {
        if (data.length !== 0) throw new NotAcceptableException('User already exist');
      }
    )

    await bcrypt.hash(password, 10, (err, hash) => {
      console.log(hash)
      if (err) {
          console.log(`[ER] ☠ Hash error --`)
          console.log(err)
          throw new InternalServerErrorException('Error while hashing password')
      } else {
          console.log('registered')
           newUser = new this.userModel({
            nom,
            prenom,
            mail,
            password: hash
          });
  
          // some console.log in order to debug
          console.log(`-----Debug on-----`)
          console.log(newUser)
  
          // persist the data into the DB and telling it's allright if it's allright
          result =  newUser.save();
      }
    })

    return { statusCode: 201,msg: 'Account Created' };
    
  }

  async auth (email: string,password: string){
    let userData: any;
    let isUserExists: any;
    let isPasswordValid: boolean;
    await // searching into DB with the query
         this.userModel.find({mail: email}).then(data => {
             userData = data[0]
             data.length !== 0 ?
              isUserExists = true
              : isUserExists = false })
         .catch(err => {
          throw new NotFoundException('Could not find user.');
         });
    
    if (userData){
      isPasswordValid = await bcrypt.compare(password, userData.password);
    }

    if(!isUserExists) {
      throw new NotFoundException('This user doesn\'t exist.');
    } else if (!isPasswordValid) throw new NotFoundException('Wrong password');

    return {status: 201,text:'Logged in succesfully', userData: {email: userData.mail,id: userData._id,nom: userData.nom, prenom: userData.prenom}}
  }

}
