/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '../controllers/users/dto/update-user.dto';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(
    options: FindOneOptions<UserEntity> | { email: string },
  ): Promise<UserEntity> {
    if ('email' in options) {
      return this.userRepository.findOneOrFail({
        where: { email: options.email },
      });
    } else {
      return this.userRepository.findOneOrFail(options);
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } });
    return count > 0;
  }

  async create(data: CreateUserDto) {
    return this.userRepository.manager.transaction(async (manager) => {
      if (await this.existsByEmail(data.email)) {
        throw new BadRequestException(
          'O e-mail informado já está em uso. Por favor, tente outro e-mail.',
        );
      }

      const user = this.userRepository.create(data);
      return await manager.save(user);
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id: id } });
    this.userRepository.merge(user, data);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    await this.findOneOrFail({ where: { id: id } });
    return this.userRepository.softDelete(id);
  }
}
