import { Module } from '@nestjs/common';
import { UserController } from './controller/app.userController';
import { UserService } from './service/app.userService';
import { ArtistService } from './service/app.artistService';
import { AlbumService } from './service/app.albumService';
import { TrackService } from './service/app.trackService';
import { FavoritesService } from './service/app.favoritesService';
import { ArtistController } from './controller/app.artistController';
import { AlbumController } from './controller/app.albumController';
import { TrackController } from './controller/app.trackController';
import { FavoritesController } from './controller/app.favoritesController';

@Module({
  imports: [],
  controllers: [UserController, ArtistController, AlbumController, TrackController, FavoritesController],
  providers: [UserService, ArtistService, AlbumService, TrackService, FavoritesService],
})
export class AppModule {}
