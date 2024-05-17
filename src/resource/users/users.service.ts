import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when creating user',
        error.stack,
      );
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when fetching users',
        error.stack,
      );
    }
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto !== null && updateUserDto !== undefined) {
      return await this.usersRepository.update(id, updateUserDto);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when deleting user',
        error.stack,
      );
    }
  }
}
