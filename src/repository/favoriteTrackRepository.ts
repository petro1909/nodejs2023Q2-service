import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/app.prismaService';
@Injectable()
export class FavoriteTrackRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.favoriteTracks.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.favoriteTracks.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(trackId: string) {
    return await this.prismaClient.favoriteTracks.create({
      data: { trackId: trackId },
    });
  }
  public async delete(trackId: string) {
    try {
      await this.prismaClient.favoriteTracks.delete({
        where: {
          trackId: trackId,
        },
      });
    } catch (err) {
      return false;
    }
    return true;
  }
}
