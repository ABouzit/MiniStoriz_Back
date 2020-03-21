import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  async get(@Res() res, @Param() params) {
    const user = await this.service.getUser(params.id);
    if (user.length === 0) {
      throw new NotFoundException("L'utilisateur n'existe pas!");
    }
    return res.status(HttpStatus.OK).json(user);
  }
  @Get()
  async getAll(@Res() res) {
    const users = await this.service.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }
  @Post()
  async create(@Body() user: User, @Res() res) {
    const newUser = await this.service.createUser(user);
    return res.status(HttpStatus.OK).json({
      message: "L'utilisateur a ete cree avec succes!",
      post: newUser,
    });
  }

  @Put()
   update(@Body() user: User, @Res() res) {
    const updatedUser = this.service.updateUser(user);
    return res.status(HttpStatus.OK).json({
      message: "L'utilisateur a ete mis a jour avec succes!",
      post: updatedUser,
    });
  }

  @Delete(':id')
  async deleteUser(@Param() params, @Res() res) {
    const deletedUsed = await this.service.deleteUser(params.id);
    console.log(deletedUsed);
    return res.status(HttpStatus.OK).json({
      message: "L'utilisateur a ete supprimer avec succes!",
      post: deletedUsed,
    });
  }
  @Post('signUp')
  async signUp(@Body() user: User, @Res() res) {
    const users = await this.service.signUp(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('signIn')
  async signIn(@Body() user: User, @Res() res) {
    const users = await this.service.signIn(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('logOut')
  async logOut(@Res() res) {
    const users = await this.service.logOut();
    return res.status(HttpStatus.OK).json(users);
  }
}
