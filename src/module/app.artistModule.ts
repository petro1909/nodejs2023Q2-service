import { Module } from '@nestjs/common';
import { ArtistController } from '../controller/app.artistController';
import { ArtistRepository } from '../repository/artistRepository';
import { ArtistService } from '../service/app.artistService';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
