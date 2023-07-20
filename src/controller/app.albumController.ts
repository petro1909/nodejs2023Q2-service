import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { AlbumService } from '../service/app.albumService';
import { CreateAlbumDto, UpdateAlbumDto, Album } from 'src/model/Album';
import { RequestParams } from 'src/model/requestParams';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Array<Album> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  getAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const album = this.albumService.getAlbum(requestParams.id);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto) {
    const album = this.albumService.createAlbum(createAlbumDto);
    return album;
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(@Param(ValidationPipe) requestParams: RequestParams, @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumService.changeAlbum(requestParams.id, updateAlbumDto);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const album = this.albumService.deleteAlbum(requestParams.id);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
