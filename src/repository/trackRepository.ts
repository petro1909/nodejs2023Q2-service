import { Injectable } from '@nestjs/common';
import { UpdateTrackDto, CreateTrackDto } from 'src/model/track';
import { PrismaService } from 'src/service/app.prismaService';
@Injectable()
export class TrackRepository {
  constructor(private readonly prismaClient: PrismaService) {}
  public async getAll() {
    return await this.prismaClient.track.findMany();
  }
  public async getOne(inputId: string) {
    return await this.prismaClient.track.findUnique({
      where: {
        id: inputId,
      },
    });
  }
  public async create(createTrackDto: CreateTrackDto) {
    return await this.prismaClient.track.create({
      data: createTrackDto,
    });
  }
  public async update(inputId: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prismaClient.track.update({
        where: {
          id: inputId,
        },
        data: updateTrackDto,
      });
    } catch (err) {
      return;
    }
  }
  public async delete(inputId: string) {
    try {
      return await this.prismaClient.track.delete({
        where: {
          id: inputId,
        },
      });
    } catch (err) {
      return;
    }
  }
}
