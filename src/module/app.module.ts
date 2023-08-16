import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './app.userModule';
import { ArtistModule } from './app.artistModule';
import { AlbumModule } from './app.albumModule';
import { TrackModule } from './app.trackModule';
import { FavoritesModule } from './app.favoritesModule';
import { DatabaseModule } from './app.databaseModule';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from 'src/middleware/app.loggingMiddleware';
import { AuthModule } from './app.authModule';
import { CustomExceptionFilter } from 'src/middleware/app.customExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './app.logModule';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    DatabaseModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
