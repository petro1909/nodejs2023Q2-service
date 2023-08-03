import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/app.prismaService';
@Injectable()
export class FavoriteAlbumRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.favoriteAlbums.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.favoriteAlbums.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(albumId: string) {
    return await this.prismaClient.favoriteAlbums.create({
      data: { albumId: albumId },
    });
  }
  public async delete(albumId: string) {
    try {
      await this.prismaClient.favoriteAlbums.delete({
        where: {
          albumId: albumId,
        },
      });
    } catch (err) {
      return false;
    }
    return true;
  }
}
