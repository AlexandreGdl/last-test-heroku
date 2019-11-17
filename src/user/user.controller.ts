import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get()
    async getAllUsers() {
        const products =  await this.userService.getUsers();
        return products;
    }

    @Post('/create')
    async createUser(
            @Body('email') userEmail: string,
            @Body('nom') nom: string,
            @Body('prenom') prenom: string,
            @Body('password') password: string,
    ){
        const response = await this.userService.createUser(userEmail,nom,prenom,password);
        return response;
    }

    @Post('/auth')
    async auth(
            @Body('email') userEmail: string,
            @Body('password') password: string,
    ){
        const response = await this.userService.auth(userEmail,password);
        return response;
    }

}
