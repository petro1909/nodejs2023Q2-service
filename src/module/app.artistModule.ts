import { Module } from '@nestjs/common';
import { ArtistController } from 'src/controller/app.artistController';
import { ArtistRepository } from 'src/repository/artistRepository';
import { ArtistService } from 'src/service/app.artistService';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
