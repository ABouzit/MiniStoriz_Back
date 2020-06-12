import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';
import { Relation } from 'src/relations/relation.entity';
@Controller('admins')
export class AdminsController {
  constructor(private service: AdminsService) {}

  @Get(':id')
  async get(@Res() res, @Param() params) {
    const user = await this.service.getUser(params.id);
    if (user.length === 0) {
      throw new NotFoundException("L'administrateur n'existe pas!");
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/admin/getAll')
  getAdmin(@Res() res) {
    return this.service.getUsersAdmin().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }

  @Post()
  async create(@Body() user: Admin, @Res() res) {
    const newUser = await this.service.createUser(user);
    return res.status(HttpStatus.OK).json({
      message: "L'admin a ete cree avec succes!",
      post: newUser,
    });
  }
  @Put()
  update(@Body() user: Admin, @Res() res) {
    return this.service.updateUser(user).then(us => {
      return res.status(HttpStatus.OK).json(us);
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
  async signUp(@Body() user: Admin, @Res() res) {
    const users = await this.service.signUp(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('signIn')
  async signIn(@Body() user: Admin, @Res() res) {
    const users = await this.service.signIn(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('logOut')
  logOut(@Res() res) {
    const users = this.service.logOut();
    return res.status(HttpStatus.OK).json(users);
  }
}
