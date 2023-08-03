import { User } from '../model/user';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/app.prismaService';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.user.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.user.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(createdUser: Omit<User, 'id'>) {
    return await this.prismaClient.user.create({
      data: createdUser,
    });
  }
  public async update(inputId: string, updatedUser: User) {
    try {
      return await this.prismaClient.user.update({
        where: {
          id: inputId,
        },
        data: updatedUser,
      });
    } catch (err) {
      return;
    }
  }

  public async delete(inputId: string) {
    try {
      return await this.prismaClient.user.delete({
        where: {
          id: inputId,
        },
      });
    } catch (err) {
      return;
    }
  }
}
