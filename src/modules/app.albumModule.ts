import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from 'src/controller/app.albumController';
import { AlbumService } from 'src/service/app.albumService';
import { TrackModule } from './app.trackModule';
import { FavoritesModule } from './app.favoritesModule';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
