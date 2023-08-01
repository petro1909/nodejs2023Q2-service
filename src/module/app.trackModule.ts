import { Module } from '@nestjs/common';
import { TrackController } from 'src/controller/app.trackController';
import { TrackRepository } from 'src/repository/trackRepository';
import { TrackService } from 'src/service/app.trackService';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService, TrackRepository],
})
export class TrackModule {}
