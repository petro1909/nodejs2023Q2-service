import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { TrackService } from '../service/app.trackService';
import { CreateTrackDto, UpdateTrackDto } from '../model/track';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException("such Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  async createTrack(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    const track = await this.trackService.createTrack(createTrackDto);
    return track;
  }

  @Put(':id')
  @HttpCode(200)
  async updateTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body(ValidationPipe) updateTrackDto: UpdateTrackDto) {
    const track = await this.trackService.changeTrack(id, updateTrackDto);
    if (!track) {
      throw new HttpException("such Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.deleteTrack(id);
    if (!track) {
      throw new HttpException("such Track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
