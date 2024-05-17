import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
  createUserSwagger,
  deleteUserSwagger,
  findAllUsersSwagger,
} from './users.swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @createUserSwagger.operation
  @createUserSwagger.createdResponse
  @createUserSwagger.badRequestResponse
  @createUserSwagger.forbiddenResponse
  @createUserSwagger.internalServerErrorResponse
  @Post('/add')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (createUserDto === null || createUserDto === undefined) {
        throw new BadRequestException('Bad request');
      }
      const user = await this.usersService.create(createUserDto);
      return `User ${user.username} created successfully`;
    } catch (error) {
      throw error;
    }
  }

  @findAllUsersSwagger.operation
  @findAllUsersSwagger.okResponse
  @findAllUsersSwagger.notFoundResponse
  @findAllUsersSwagger.internalServerErrorResponse
  @Get('/all')
  async findAll() {
    try {
      const users: User[] = await this.usersService.findAll();
      if (users.length === 0) {
        throw new NotFoundException('No users found in the database');
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @deleteUserSwagger.operation
  @deleteUserSwagger.okResponse
  @deleteUserSwagger.notFoundResponse
  @deleteUserSwagger.internalServerErrorResponse
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      const user = await this.usersService.remove(id);
      if (user.affected === 0) {
        throw new NotFoundException('User not found');
      } else {
        return `User with id ${id} deleted successfully`;
      }
    } catch (error) {
      throw error;
    }
  }
}
