import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from 'src/controller/app.favoritesController';
import { FavoritesService } from 'src/service/app.favoritesService';
import { TrackModule } from './app.trackModule';
import { AlbumModule } from './app.albumModule';
import { ArtistModule } from './app.artistModule';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule), forwardRef(() => ArtistModule)],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
