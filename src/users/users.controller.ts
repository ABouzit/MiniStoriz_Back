import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Relation } from 'src/relations/relation.entity';
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
  @Get('/admin/getById/:id')
  async getadmin(@Res() res, @Param() params) {
    const user = await this.service.getUser(params.id);
    if (user.length === 0) {
      throw new NotFoundException("L'utilisateur n'existe pas!");
    }
    return res.status(HttpStatus.OK).json(user);
  }
  @Get('/admin/getAll') 
  getAdmin(@Res() res) {
    return this.service.getUsersAdmin().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/admin/Count') 
  countAdmin(@Res() res) {
    return this.service.countUsers().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/admin/getAllSignaled')
  getAdminSignal(@Res() res) {
    return this.service.getUsersAdminOrderBySignal().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/admin/getAllAorD')
  getAdminAorD(@Res() res) {
    return this.service.getUsersAdminActiveDesactive().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  } 
  @Get('/admin/getAllACount')
  getAdminA(@Res() res) {
    return this.service.countUsersAdminActive().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/admin/getAllDCount')
  getAdminD(@Res() res) {
    return this.service.countUsersAdminDesactive().then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/take/:number/:skip/:search/:id')
  getAllUsersSearch(@Res() res, @Param() params) {
    return this.service
      .getAllUsersSearch(params.id, params.number, params.skip, params.search)
      .then(users => {
        return res.status(HttpStatus.OK).json(users);
      });
  }
  @Get('/DispoLogin/:email')
  getCheckLogin(@Res() res, @Param() params) {
    return this.service
      .getDispoLogin(params.email)
      .then(users => {
        return res.status(HttpStatus.OK).json(users);
      });
  }
  @Get('/relations/:search/:id')
  getAllUsersSearchs(@Res() res, @Param() params) {
    return this.service
      .getAllUsersSearchs(params.id, params.search)
      .then(users => {
        return res.status(HttpStatus.OK).json(users);
      });
  }
  @Get('/relations/:id')
  getAllUsers(@Res() res, @Param() params) {
    return this.service.getAllUsers(params.id).then(users => {
      return res.status(HttpStatus.OK).json(users);
    });
  }
  @Get('/numberSearchUsers/:search')
  getNumberSearchUsers(@Res() res, @Param() params) {
    return this.service.getNumberUsersSearch(params.search).then(number => {
      return res.status(HttpStatus.OK).json(number);
    });
  }
  @Get('/userRelation/:id')
  async getAll(@Res() res, @Param() params) {
    const users = await this.service.getUsers(params.id);
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
  @Put('/demandeResignation')
  desactive(@Body() user: User, @Res() res) {
    return this.service.updateUser(user).then(us => {
      return res.status(HttpStatus.OK).json(us);
    });
  }
  @Put('admin/AorD')
  AorD(@Body() user: User, @Res() res) {
    return this.service.updateUser(user).then(us => {
      return res.status(HttpStatus.OK).json(us);
    });
  }
  @Put()
  update(@Body() user: User, @Res() res) {
    return this.service.updateUsers(user).then(us => {
      return res.status(HttpStatus.OK).json(us);
    });
  }
  @Put('/bloquer/:numberJours')
  bloquer(@Body() user: User, @Res() res, @Param() params) {
    return this.service.bloquerUser(user, params.numberJours).then(us => {
      return res.status(HttpStatus.OK).json(us);
    });
  }
  @Put('/debloquer')
  debbloquer(@Body() user: User, @Res() res) {
    return this.service.debloquerUser(user).then(us => {
      return res.status(HttpStatus.OK).json(us);
    });
  }
  @Put('/relation/:id')
  updateRelation(@Param() params, @Body() relation: Relation, @Res() res) {
    return this.service.updateRelation(relation, params.id).then(relation => {
      return res.status(HttpStatus.OK).json(relation);
    });
  }
  @Put('/accRelation/:id/:id2')
  updateRelation2(@Param() params, @Body() relation: Relation, @Res() res) {
    return this.service.updateRelation2(params.id, params.id2).then(relation => {
      return res.status(HttpStatus.OK).json(relation);
    });
  }
  @Delete('/deleteRelation/:id/:id2')
  deleteRelation(@Param() params, @Body() relation: Relation, @Res() res) {
    return this.service.deleteRelation(params.id, params.id2).then(relation => {
      return res.status(HttpStatus.OK).json(relation);
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
  @Post('signUpMethode')
  signUpMethode(@Body() user: any, @Res() res) {
    return this.service.signUpMethode(user).then(ress => {
      return res.status(HttpStatus.OK).json(ress);
    })
    
  }
  @Post('signIn')
  async signIn(@Body() user: User, @Res() res) {
    const users = await this.service.signIn(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('changePassword')
  async changePassword(@Body() user: User, @Res() res) {
    const users = await this.service.updatePassword(user);
    return res.status(HttpStatus.OK).json(users);
  }
  @Post('logOut')
  logOut(@Res() res) {
    const users = this.service.logOut();
    return res.status(HttpStatus.OK).json(users);
  }
}
