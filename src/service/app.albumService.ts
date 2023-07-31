import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, Album } from 'src/model/Album';
import { v4 } from 'uuid';
import { TrackService } from './app.trackService';
import { FavoritesService } from './app.favoritesService';

@Injectable()
export class AlbumService {
  constructor(private readonly trackService: TrackService, private readonly favoritesService: FavoritesService) {}

  private albums: Array<Album> = [];
  getAlbums(): Array<Album> {
    return this.albums;
  }

  getAlbum(inputId: string): Album | undefined {
    const findedAlbum = this.albums.find((album) => album.id === inputId);
    return findedAlbum;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const createdAlbumId = v4();
    const createdAlbum: Album = {
      id: createdAlbumId,
      ...createAlbumDto,
    };
    this.albums.push(createdAlbum);
    return createdAlbum;
  }

  changeAlbum(inputId: string, updateAlbumDto: UpdateAlbumDto): Album | undefined {
    const editedAlbum = this.albums.find((album) => album.id === inputId);
    if (!editedAlbum) return;
    Object.assign(editedAlbum, updateAlbumDto);
    return editedAlbum;
  }

  resetAlbumsForDeletedArtist(inputAtristId: string) {
    const artistAlbums = this.albums.filter((album) => album.artistId === inputAtristId);
    artistAlbums.map((album) => (album.artistId = null));
  }

  deleteAlbum(inputId: string): Album | undefined {
    const deletedAlbum = this.albums.find((album) => album.id === inputId);
    if (!deletedAlbum) return;

    this.trackService.resetTracksForDeletedAlbum(deletedAlbum.id);
    this.favoritesService.deleteAlbum(deletedAlbum.id);

    const foundedAlbumIndex = this.albums.indexOf(deletedAlbum);
    this.albums.splice(foundedAlbumIndex, 1);
    return deletedAlbum;
  }
}
