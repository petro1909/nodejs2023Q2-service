import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/model/favorites';
import { AlbumRepository } from 'src/repository/albumRepository';
import { ArtistRepository } from 'src/repository/artistRepository';
import { FavoriteAlbumRepository } from 'src/repository/favoriteAlbumRepository';
import { FavoriteArtistRepository } from 'src/repository/favoriteArtistRepository';
import { FavoriteTrackRepository } from 'src/repository/favoriteTrackRepository';
import { TrackRepository } from 'src/repository/trackRepository';
@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoriteAlbumRepository: FavoriteAlbumRepository,
    private readonly favoriteArtistRepository: FavoriteArtistRepository,
    private readonly favoriteTrackRepository: FavoriteTrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const favoritesArtistsId = await this.favoriteArtistRepository.getAll();
    const favoritesAlbumsId = await this.favoriteAlbumRepository.getAll();
    const favoritesTracks = await this.favoriteTrackRepository.getAll();
    return {
      artists: await Promise.all(favoritesArtistsId.map(async (favArtist) => await this.artistRepository.getOne(favArtist.artistId))),
      albums: await Promise.all(favoritesAlbumsId.map(async (favAlbum) => await this.albumRepository.getOne(favAlbum.albumId))),
      tracks: await Promise.all(favoritesTracks.map(async (favTrack) => await this.trackRepository.getOne(favTrack.trackId))),
    };
  }

  async addArtist(artistId: string) {
    return await this.favoriteArtistRepository.create(artistId);
  }
  async addAlbum(albumId: string) {
    return await this.favoriteAlbumRepository.create(albumId);
  }
  async addTrack(trackId: string) {
    return await this.favoriteTrackRepository.create(trackId);
  }

  async deleteArtist(artistId: string): Promise<boolean> {
    return await this.favoriteArtistRepository.delete(artistId);
  }

  async deleteAlbum(albumId: string): Promise<boolean> {
    return await this.favoriteAlbumRepository.delete(albumId);
  }

  async deleteTrack(albumId: string): Promise<boolean> {
    return await this.favoriteTrackRepository.delete(albumId);
  }
}
