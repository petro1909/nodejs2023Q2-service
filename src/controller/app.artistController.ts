import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from '../service/app.artistService';
import { CreateArtistDto, UpdateArtistDto } from '../model/artist';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(200)
  async getArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.getArtist(id);
    if (!artist) {
      throw new HttpException("such artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  @HttpCode(201)
  async createArtist(@Body(ValidationPipe) createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.createArtist(createArtistDto);
    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.changeArtist(id, updateArtistDto);
    if (!artist) {
      throw new HttpException("such artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.deleteArtist(id);
    if (!artist) {
      throw new HttpException("such artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
