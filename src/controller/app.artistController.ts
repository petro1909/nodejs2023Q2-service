import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { ArtistService } from '../service/app.artistService';
import { CreateArtistDto, UpdateArtistDto, Artist } from 'src/model/Artist';
import { RequestParams } from 'src/model/requestParams';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Array<Artist> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    const Artist = this.artistService.getArtist(requestParams.id);
    if (!Artist) {
      throw new HttpException("such Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return Artist;
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    const Artist = this.artistService.createArtist(createArtistDto);
    return Artist;
  }

  @Put()
  @HttpCode(200)
  updateArtist(@Param(ValidationPipe) requestParams: RequestParams, @Body(ValidationPipe) updateArtistDto: UpdateArtistDto) {
    const artist = this.artistService.changeArtist(requestParams.id, updateArtistDto);
    if (!artist) {
      throw new HttpException("such Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    const artist = this.artistService.deleteArtist(requestParams.id);
    if (!artist) {
      throw new HttpException("such Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
