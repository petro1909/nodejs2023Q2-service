import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto, Artist } from 'src/model/artist';
import { TrackService } from './app.trackService';
import { AlbumService } from './app.albumService';
import { FavoritesService } from './app.favoritesService';
import { ArtistRepository } from 'src/repository/artistRepository';
@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoritesService,
    private readonly artistRepository: ArtistRepository,
  ) {}

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
