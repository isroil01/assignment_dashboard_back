import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as passportJwt from 'passport-jwt';
const ExtractJwt: typeof passportJwt.ExtractJwt = passportJwt.ExtractJwt;
const Strategy: typeof passportJwt.Strategy = passportJwt.Strategy;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.access_token as string;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey',
    });
  }

  validate(payload: { id: string }) {
    return {
      id: payload.id,
    }; // Return user data for access token validation
  }
}
