import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, Track } from '../model/track';
import { TrackRepository } from '../repository/trackRepository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async getTracks(): Promise<Array<Track>> {
    return await this.trackRepository.getAll();
  }

  async getTrack(inputId: string): Promise<Track | undefined> {
    return await this.trackRepository.getOne(inputId);
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackRepository.create(createTrackDto);
  }

  async changeTrack(inputId: string, updateTrackDto: UpdateTrackDto): Promise<Track | undefined> {
    return await this.trackRepository.update(inputId, updateTrackDto);
  }

  async deleteTrack(inputId: string): Promise<Track | undefined> {
    return await this.trackRepository.delete(inputId);
  }
}
