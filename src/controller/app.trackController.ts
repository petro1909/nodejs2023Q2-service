import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { TrackService } from '../service/app.trackService';
import { CreateTrackDto, UpdateTrackDto } from 'src/model/Track';
import { RequestParams } from 'src/model/requestParams';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    const track = await this.trackService.getTrack(requestParams.id);
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
  async updateTrack(@Param(ValidationPipe) requestParams: RequestParams, @Body(ValidationPipe) updateTrackDto: UpdateTrackDto) {
    const track = await this.trackService.changeTrack(requestParams.id, updateTrackDto);
    if (!track) {
      throw new HttpException("such Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    const track = await this.trackService.deleteTrack(requestParams.id);
    if (!track) {
      throw new HttpException("such Track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
