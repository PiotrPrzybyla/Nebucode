import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserEntity from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserLoginDto } from './dtos/user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(newUser: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(newUser);
  }
  async findUser(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }
}
