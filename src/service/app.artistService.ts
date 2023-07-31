import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto, Artist } from 'src/model/artist';
import { v4 } from 'uuid';
import { TrackService } from './app.trackService';
import { AlbumService } from './app.albumService';
import { FavoritesService } from './app.favoritesService';
@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoritesService,
  ) {}

  private artists: Array<Artist> = [];
  getArtists(): Array<Artist> {
    return this.artists;
  }

  getArtist(inputId: string): Artist | undefined {
    const findedArtist = this.artists.find((artist) => artist.id === inputId);
    return findedArtist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const createdArtistId = v4();
    const createdArtist: Artist = {
      id: createdArtistId,
      ...createArtistDto,
    };
    this.artists.push(createdArtist);
    return createdArtist;
  }

  changeArtist(inputId: string, updateArtistDto: UpdateArtistDto): Artist | undefined {
    const editedArtist = this.artists.find((artist) => artist.id === inputId);
    if (!editedArtist) return;
    Object.assign(editedArtist, updateArtistDto);
    return editedArtist;
  }

  deleteArtist(inputId: string): Artist | undefined {
    const deletedArtist = this.artists.find((artist) => artist.id === inputId);
    if (!deletedArtist) return;

    this.favoriteService.deleteArtist(deletedArtist.id);
    this.albumService.resetAlbumsForDeletedArtist(deletedArtist.id);
    this.trackService.resetTracksForDeletedArtist(deletedArtist.id);

    const foundedArtistIndex = this.artists.indexOf(deletedArtist);
    this.artists.splice(foundedArtistIndex, 1);
    return deletedArtist;
  }
}
