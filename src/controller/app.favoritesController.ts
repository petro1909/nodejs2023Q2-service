import { Controller, Get, Post, Delete, Param, HttpCode, ValidationPipe } from '@nestjs/common';
import { FavoritesResponse } from 'src/model/favorites';
import { RequestParams } from 'src/model/requestParams';
import { FavoritesService } from 'src/service/app.favoritesService';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  addFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.addTrack(requestParams.id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.addAlbum(requestParams.id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.addArtist(requestParams.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavoriteTrack(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.deleteTrack(requestParams.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavoriteAlbum(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.deleteAlbum(requestParams.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavoriteArtist(@Param(ValidationPipe) requestParams: RequestParams) {
    this.favoritesService.deleteArtist(requestParams.id);
  }
}
