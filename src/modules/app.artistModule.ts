import { Module, forwardRef } from '@nestjs/common';
import { ArtistController } from 'src/controller/app.artistController';
import { ArtistService } from 'src/service/app.artistService';
import { TrackModule } from './app.trackModule';
import { AlbumModule } from './app.albumModule';
import { FavoritesModule } from './app.favoritesModule';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule), forwardRef(() => FavoritesModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
