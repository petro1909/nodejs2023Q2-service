import { Injectable } from '@nestjs/common';
import { UpdateArtistDto, CreateArtistDto, Artist } from '../model/artist';
import { PrismaService } from '../service/app.prismaService';
@Injectable()
export class ArtistRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.artist.findMany();
  }
  public async getOne(inputId: string): Promise<Artist> {
    return await this.prismaClient.artist.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(createArtistDto: CreateArtistDto) {
    return await this.prismaClient.artist.create({
      data: createArtistDto,
    });
  }
  public async update(inputId: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prismaClient.artist.update({
        where: {
          id: inputId,
        },
        data: updateArtistDto,
      });
    } catch (err) {
      return;
    }
  }
  public async delete(inputId: string) {
    try {
      return await this.prismaClient.artist.delete({
        where: {
          id: inputId,
        },
      });
    } catch (err) {
      return;
    }
  }
}
