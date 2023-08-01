import { Module } from '@nestjs/common';
import { FavoritesController } from 'src/controller/app.favoritesController';
import { FavoritesService } from 'src/service/app.favoritesService';
import { FavoriteArtistRepository } from 'src/repository/favoriteArtistRepository';
import { FavoriteAlbumRepository } from 'src/repository/favoriteAlbumRepository';
import { FavoriteTrackRepository } from 'src/repository/favoriteTrackRepository';
import { ArtistModule } from './app.artistModule';
import { AlbumModule } from './app.albumModule';
import { TrackModule } from './app.trackModule';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteArtistRepository, FavoriteAlbumRepository, FavoriteTrackRepository],
})
export class FavoritesModule {}
