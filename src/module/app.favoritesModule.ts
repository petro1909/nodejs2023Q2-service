import { Module } from '@nestjs/common';
import { FavoritesController } from '../controller/app.favoritesController';
import { FavoritesService } from '../service/app.favoritesService';
import { FavoriteArtistRepository } from '../repository/favoriteArtistRepository';
import { FavoriteAlbumRepository } from '../repository/favoriteAlbumRepository';
import { FavoriteTrackRepository } from '../repository/favoriteTrackRepository';
import { ArtistModule } from './app.artistModule';
import { AlbumModule } from './app.albumModule';
import { TrackModule } from './app.trackModule';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteArtistRepository, FavoriteAlbumRepository, FavoriteTrackRepository],
})
export class FavoritesModule {}
