import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/model/favorites';
@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  getFavorites(): Favorites {
    return this.favorites;
  }

  addArtist(artistId: string) {
    return this.addToFavorites(artistId, 'artists');
  }
  addAlbum(albumId: string) {
    return this.addToFavorites(albumId, 'albums');
  }
  addTrack(trackId: string) {
    return this.addToFavorites(trackId, 'tracks');
  }

  deleteArtist(artistId: string): boolean {
    return this.deleteFromFavorites(artistId, 'artists');
  }

  deleteAlbum(albumId: string): boolean {
    return this.deleteFromFavorites(albumId, 'albums');
  }

  deleteTrack(trackId: string): boolean {
    return this.deleteFromFavorites(trackId, 'tracks');
  }

  private addToFavorites(id: string, type: string) {
    const array = this.favorites[type as keyof typeof this.favorites];
    if (!array.includes(id)) {
      array.push(id);
    }
  }

  private deleteFromFavorites(id: string, type: string) {
    const itemIndex = this.favorites[type as keyof typeof this.favorites].indexOf(id);
    if (itemIndex !== -1) {
      this.favorites[type as keyof typeof this.favorites].splice(itemIndex, 1);
    }
    return itemIndex !== -1;
  }
}
