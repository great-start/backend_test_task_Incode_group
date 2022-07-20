import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { IUser } from '../../user/intefaces/user.inteface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getToken(user: IUser) {
    return this._generateToken(user);
  }

  public async saveToken(accessToken: string, userId: number) {
    return this.prismaService.token.create({
      data: { userId, accessToken },
    });
  }

  private _generateToken(user: IUser) {
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
    });
    return { accessToken, userId: user.id };
  }

  public async findToken(token: string) {
    return this.prismaService.token.findFirst({
      where: {
        accessToken: token,
      },
    });
  }

  public async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
}
