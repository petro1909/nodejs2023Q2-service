import { Module } from '@nestjs/common';
import { AlbumController } from 'src/controller/app.albumController';
import { AlbumRepository } from 'src/repository/albumRepository';
import { AlbumService } from 'src/service/app.albumService';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
