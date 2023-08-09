import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/app.prismaService';
@Injectable()
export class FavoriteArtistRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.favoriteArtists.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.favoriteArtists.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(artistId: string) {
    return await this.prismaClient.favoriteArtists.create({
      data: { artistId: artistId },
    });
  }
  public async delete(artistId: string): Promise<boolean> {
    try {
      await this.prismaClient.favoriteArtists.delete({
        where: {
          artistId: artistId,
        },
      });
    } catch (err) {
      return false;
    }
    return true;
  }
}
