import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, email: string, password: string) {
    const existing = this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('User already exists');

    const user = await this.usersService.create(username, email, password);

    const { accessToken, refreshToken } = this.generateJwtToken({
      id: user.id,
    });
    return { user, accessToken, refreshToken };
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    console.log(user, 'user');

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken } = this.generateJwtToken({
      id: user.id,
    });
    return { user, accessToken, refreshToken };
  }

  generateJwtToken(payload: { id: string }) {
    // Access Token Payload (minimal info for the client)
    const accessTokenPayload = {
      id: payload.id,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '4h',
    });

    const refreshToken = this.jwtService.sign(accessTokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '5h', // Longer expiry for refresh token
    });

    return { accessToken, refreshToken };
  }

  refreshToken(token: string) {
    if (!token) throw new UnauthorizedException('Refresh token missing');

    try {
      const payload = this.jwtService.verify<{ id: string }>(token);
      const newAccessToken = this.jwtService.sign({ id: payload.id });
      return { accessToken: newAccessToken };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  getUserData(userId: string) {
    const user = this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
