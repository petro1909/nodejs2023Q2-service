import { Favorites, FavoritesResponse } from 'src/type/favorites';
import { TrackService } from './app.trackService';
import { AlbumService } from './app.albumService';
import { ArtistService } from './app.artistService';

export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  private favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  getFavorites(): FavoritesResponse {
    return {
      artists: this.favorites.artists.map((artistId) => this.artistService.getArtist(artistId)),
      tracks: this.favorites.tracks.map((trackId) => this.trackService.getTrack(trackId)),
      albums: this.favorites.albums.map((albumId) => this.albumService.getAlbum(albumId)),
    };
  }

  addArtist(artistId: string) {
    this.addToFavorites(artistId, 'artists');
  }
  addAlbum(albumId: string) {
    this.addToFavorites(albumId, 'album');
  }
  addTrack(trackId: string) {
    this.addToFavorites(trackId, 'track');
  }

  deleteArtist(artistId: string) {
    this.deleteFromFavorites(artistId, 'artists');
  }

  deleteAlbum(albumId: string) {
    this.deleteFromFavorites(albumId, 'album');
  }

  deleteTrack(trackId: string) {
    this.deleteFromFavorites(trackId, 'track');
  }

  private addToFavorites(id: string, type: string) {
    this.favorites[type as keyof typeof this.favorites].push(id);
  }

  private deleteFromFavorites(id: string, type: string) {
    const itemIndex = this.favorites[type as keyof typeof this.favorites].indexOf(id);
    if (itemIndex !== -1) {
      this.favorites[type as keyof typeof this.favorites].splice(itemIndex, 1);
    }
  }
}
