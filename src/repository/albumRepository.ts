import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto, CreateAlbumDto } from 'src/model/album';
import { PrismaService } from 'src/service/app.prismaService';
@Injectable()
export class AlbumRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.album.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.album.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(createAlbumDto: CreateAlbumDto) {
    return await this.prismaClient.album.create({
      data: createAlbumDto,
    });
  }
  public async update(inputId: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prismaClient.album.update({
        where: {
          id: inputId,
        },
        data: updateAlbumDto,
      });
    } catch (err) {
      return;
    }
  }

  public async delete(inputId: string) {
    try {
      return await this.prismaClient.album.delete({
        where: {
          id: inputId,
        },
      });
    } catch (err) {
      return;
    }
  }
}
