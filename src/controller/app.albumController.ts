import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { AlbumService } from '../service/app.albumService';
import { CreateAlbumDto, UpdateAlbumDto } from '../model/album';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  async getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumService.getAlbum(id);
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
  async updateAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumService.changeAlbum(id, updateAlbumDto);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.albumService.deleteAlbum(id);
    if (!album) {
      throw new HttpException("such Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
