import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, Album } from 'src/model/Album';
import { AlbumRepository } from 'src/repository/albumRepository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async getAlbums(): Promise<Array<Album>> {
    return await this.albumRepository.getAll();
  }

  async getAlbum(inputId: string): Promise<Album | undefined> {
    return await this.albumRepository.getOne(inputId);
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumRepository.create(createAlbumDto);
  }

  async changeAlbum(inputId: string, updateAlbumDto: UpdateAlbumDto): Promise<Album | undefined> {
    return await this.albumRepository.update(inputId, updateAlbumDto);
  }

  async deleteAlbum(inputId: string): Promise<Album | undefined> {
    return await this.albumRepository.delete(inputId);
  }
}
