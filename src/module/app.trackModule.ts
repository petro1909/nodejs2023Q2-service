import { Module } from '@nestjs/common';
import { TrackController } from '../controller/app.trackController';
import { TrackRepository } from '../repository/trackRepository';
import { TrackService } from '../service/app.trackService';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService, TrackRepository],
})
export class TrackModule {}
