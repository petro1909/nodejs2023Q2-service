import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './app.userModule';
import { ArtistModule } from './app.artistModule';
import { AlbumModule } from './app.albumModule';
import { TrackModule } from './app.trackModule';
import { FavoritesModule } from './app.favoritesModule';
import { DatabaseModule } from './app.databaseModule';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from 'src/logging/app.loggingMiddleware';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArtistModule, AlbumModule, TrackModule, FavoritesModule, DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
