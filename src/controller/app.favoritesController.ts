import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesResponse } from '../model/favorites';
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
  async addFavoriteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const trackId = id;
    if (!(await this.trackService.getTrack(trackId))) {
      throw new HttpException("such track doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addTrack(trackId);
    return 'track added to favorites';
  }

  @Post('album/:id')
  @HttpCode(201)
  async addFavoriteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const albumId = id;
    if (!(await this.albumService.getAlbum(albumId))) {
      throw new HttpException("such album doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addAlbum(albumId);
    return 'album added to favorites';
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addFavoriteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artistId = id;
    if (!(await this.artistService.getArtist(artistId))) {
      throw new HttpException("such artist doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.favoritesService.addArtist(artistId);
    return 'artist added to favorites';
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavoriteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!(await this.favoritesService.deleteTrack(id))) {
      throw new HttpException("such favorite track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavoriteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!(await this.favoritesService.deleteAlbum(id))) {
      throw new HttpException("such favorite album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavoriteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!(await this.favoritesService.deleteArtist(id))) {
      throw new HttpException("such favorite artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
