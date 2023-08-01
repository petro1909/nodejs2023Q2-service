import { Module } from '@nestjs/common';
import { UserModule } from './app.userModule';
import { ArtistModule } from './app.artistModule';
import { AlbumModule } from './app.albumModule';
import { TrackModule } from './app.trackModule';
import { FavoritesModule } from './app.favoritesModule';
import { DatabaseModule } from './app.databaseModule';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, FavoritesModule, DatabaseModule],
})
export class AppModule {}
