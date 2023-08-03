import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { AlbumService } from '../service/app.albumService';
import { CreateAlbumDto, UpdateAlbumDto } from '../model/album';
import { RequestParams } from '../model/requestParams';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  async getAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const album = await this.albumService.getAlbum(requestParams.id);
    if (!album) {
      throw new HttpException("such album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  async createAlbum(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    const album = await this.albumService.createAlbum(createAlbumDto);
    return album;
  }

  @Put(':id')
  @HttpCode(200)
  async updateAlbum(@Param(ValidationPipe) requestParams: RequestParams, @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumService.changeAlbum(requestParams.id, updateAlbumDto);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const album = await this.albumService.deleteAlbum(requestParams.id);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
