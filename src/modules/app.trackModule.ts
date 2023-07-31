import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from 'src/controller/app.trackController';
import { TrackService } from 'src/service/app.trackService';
import { FavoritesModule } from './app.favoritesModule';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
