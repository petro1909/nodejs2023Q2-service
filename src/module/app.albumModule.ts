import { Module } from '@nestjs/common';
import { AlbumController } from '../controller/app.albumController';
import { AlbumRepository } from '../repository/albumRepository';
import { AlbumService } from '../service/app.albumService';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
