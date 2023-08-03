import { Controller, Get, Post, Delete, Param, HttpCode, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { FavoritesResponse } from '../model/favorites';
import { RequestParams } from '../model/requestParams';
import { AlbumService } from '../service/app.albumService';
import { ArtistService } from '../service/app.artistService';
import { FavoritesService } from '../service/app.favoritesService';
import { TrackService } from '../service/app.trackService';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async getFavorites(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesService.getFavorites();
    return favorites;
  }

  @Post('track/:id')
  @HttpCode(201)
  async addFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    const trackId = requestParams.id;
    if (!(await this.trackService.getTrack(trackId))) {
      throw new HttpException("such track doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addTrack(trackId);
    return 'track added to favorites';
  }

  @Post('album/:id')
  @HttpCode(201)
  async addFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    const albumId = requestParams.id;
    if (!(await this.albumService.getAlbum(albumId))) {
      throw new HttpException("such album doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addAlbum(albumId);
    return 'album added to favorites';
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    const artistId = requestParams.id;
    if (!(await this.artistService.getArtist(artistId))) {
      throw new HttpException("such artist doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addArtist(artistId);
    return 'artist added to favorites';
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!(await this.favoritesService.deleteTrack(requestParams.id))) {
      throw new HttpException("such favorite track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!(await this.favoritesService.deleteAlbum(requestParams.id))) {
      throw new HttpException("such favorite album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    if (!(await this.favoritesService.deleteArtist(requestParams.id))) {
      throw new HttpException("such favorite artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
