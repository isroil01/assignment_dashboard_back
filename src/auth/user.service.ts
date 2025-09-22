import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

@Injectable()
export class UsersService {
  private readonly dataFolder = path.join(__dirname, '..', 'data', 'users');

  constructor() {
    if (!fs.existsSync(this.dataFolder)) {
      fs.mkdirSync(this.dataFolder, { recursive: true });
    }
  }

  private getFilePath(id: string) {
    return path.join(this.dataFolder, `${id}.json`);
  }

  async create(username: string, email: string, password: string) {
    try {
      const id = Date.now().toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: User = {
        id,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
      fs.writeFileSync(this.getFilePath(id), JSON.stringify(user, null, 2));
      return { id, username, email };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findByEmail(email: string) {
    try {
      const files = fs.readdirSync(this.dataFolder);
      for (const file of files) {
        const users = fs.readFileSync(
          path.join(this.dataFolder, file),
          'utf-8',
        );
        const user = JSON.parse(users) as User;
        if (user.email === email) return user;
      }
      return undefined;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to read user data');
    }
  }

  async validateUser(email: string, password: string) {
    const user = this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch)
      return { id: user.id, username: user.username, email: user.email };
    return null;
  }

  findById(id: string) {
    try {
      const filePath = this.getFilePath(id);
      if (!fs.existsSync(filePath)) return null;

      const user = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as User;
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      }; // do not return password
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to read user data');
    }
  }
}
