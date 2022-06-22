import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const hashedPasswd = await bcrypt.hash(body.password, 10);
    return this.authService.create({
      name: body.name,
      email: body.email,
      password: hashedPasswd,
    });
  }

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const user = await this.authService.findUser(body.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
