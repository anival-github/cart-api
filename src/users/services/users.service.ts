import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  findOne(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async createOne({ name, password }: User) {
    const newUser = this.userRepository.create({
      name,
      password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
