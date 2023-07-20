import { Controller, Get, Post, Delete, Param, HttpCode, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { FavoritesResponse } from 'src/model/favorites';
import { RequestParams } from 'src/model/requestParams';
import { AlbumService } from 'src/service/app.albumService';
import { ArtistService } from 'src/service/app.artistService';
import { FavoritesService } from 'src/service/app.favoritesService';
import { TrackService } from 'src/service/app.trackService';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  getFavorites(): FavoritesResponse {
    const favorites = this.favoritesService.getFavorites();
    return {
      artists: favorites.artists.map((artistId) => this.artistService.getArtist(artistId)),
      tracks: favorites.tracks.map((trackId) => this.trackService.getTrack(trackId)),
      albums: favorites.albums.map((albumId) => this.albumService.getAlbum(albumId)),
    };
  }

  @Post('track/:id')
  @HttpCode(201)
  addFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    const trackId = requestParams.id;
    if (!this.trackService.getTrack(trackId)) {
      throw new HttpException("such track doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.favoritesService.addTrack(trackId);
    return 'track added to favorites';
  }

  @Post('album/:id')
  @HttpCode(201)
  addFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const albumId = requestParams.id;
    if (!this.albumService.getAlbum(albumId)) {
      throw new HttpException("such album doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.favoritesService.addAlbum(albumId);
    return 'album added to favorites';
  }

  @Post('artist/:id')
  @HttpCode(201)
  addFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    const artistId = requestParams.id;
    if (!this.artistService.getArtist(artistId)) {
      throw new HttpException("such artist doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this.favoritesService.addArtist(artistId);
    return 'artist added to favorites';
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!this.favoritesService.deleteTrack(requestParams.id)) {
      throw new HttpException("such favorite track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!this.favoritesService.deleteAlbum(requestParams.id)) {
      throw new HttpException("such favorite album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!this.favoritesService.deleteArtist(requestParams.id)) {
      throw new HttpException("such favorite artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
