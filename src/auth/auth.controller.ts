import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AppService } from '../app.service';

@Controller('user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const hashedPasswd = await bcrypt.hash(body.password, 10);
    const user = this.authService.create({
      name: body.name,
      email: body.email,
      password: hashedPasswd,
    });
    delete (await user).password;

    return user;
  }

  @Post('login')
  async login(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findUser(body.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      messaage: 'success',
    };
  }

  @Get('auth')
  async auth(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const user = await this.authService.findUser(data['email']);

      const { password, ...result } = user;

      return result;
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Logout',
    };
  }
}
