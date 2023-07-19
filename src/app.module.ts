import { Module } from '@nestjs/common';
import { UserController } from './controller/app.userController';
import { UserService } from './service/app.userService';
import { ArtistService } from './service/app.artistService';
import { AlbumService } from './service/app.albumService';
import { TrackService } from './service/app.trackService';
import { FavoritesService } from './service/app.favoritesService';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ArtistService, AlbumService, TrackService, FavoritesService],
})
export class AppModule {}
