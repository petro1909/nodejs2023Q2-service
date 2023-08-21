import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto, Artist } from '../model/artist';
import { ArtistRepository } from '../repository/artistRepository';
@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getArtists(): Promise<Array<Artist>> {
    return await this.artistRepository.getAll();
  }

  async getArtist(inputId: string): Promise<Artist | undefined> {
    return await this.artistRepository.getOne(inputId);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.create(createArtistDto);
  }

  async changeArtist(inputId: string, updateArtistDto: UpdateArtistDto): Promise<Artist | undefined> {
    return await this.artistRepository.update(inputId, updateArtistDto);
  }

  async deleteArtist(inputId: string): Promise<Artist | undefined> {
    return await this.artistRepository.delete(inputId);
  }
}
