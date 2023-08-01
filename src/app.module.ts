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
import { UserRepository } from './repository/userRepositoty';
import { ArtistRepository } from './repository/artistRepository';
import { AlbumRepository } from './repository/albumRepository';
import { TrackRepository } from './repository/trackRepository';
import { FavoriteAlbumRepository } from './repository/favoriteAlbumRepository';
import { FavoriteArtistRepository } from './repository/favoriteArtistRepository';
import { FavoriteTrackRepository } from './repository/favoriteTrackRepository';
import { PrismaService } from './service/app.prismaService';

@Module({
  controllers: [UserController, ArtistController, AlbumController, TrackController, FavoritesController],
  providers: [
    PrismaService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
    UserRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
    FavoriteAlbumRepository,
    FavoriteArtistRepository,
    FavoriteTrackRepository,
  ],
})
export class AppModule {}
