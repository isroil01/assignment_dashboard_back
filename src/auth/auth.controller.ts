import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; email: string; password: string },
    @Res({ passthrough: true }) res: express.Response,
  ) {
    try {
      const { accessToken, refreshToken, user } = await this.authService.signup(
        body.username,
        body.email,
        body.password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
        path: '/',
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return { user, accessToken };
    } catch (err: any) {
      console.log(err);
      throw new HttpException('Signup failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('signin')
  async signin(
    @Body()
    body: {
      email: string;
      password: string;
    },
    @Res({ passthrough: true }) res: express.Response,
  ) {
    try {
      const { user, accessToken, refreshToken } = await this.authService.signin(
        body.email,
        body.password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
        path: '/',
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      return { user, accessToken };
    } catch (err) {
      console.log(err);
      throw new HttpException('Signin failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: express.Response) {
    try {
      // Clear cookies
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return { message: 'Logged out successfully' };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh')
  refresh(@Req() req: express.Request & { cookies: Record<string, string> }) {
    try {
      const cookies: Record<string, string> =
        typeof req.cookies === 'object' && req.cookies !== null
          ? (req.cookies as Record<string, string>)
          : {};
      const token = cookies['refresh_token'];
      const newTokens = this.authService.refreshToken(token);
      return newTokens;
    } catch (err) {
      console.log(err);
      throw new HttpException('Refresh token failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: { user: { id: string } }) {
    return this.authService.getUserData(req.user.id);
  }
}
