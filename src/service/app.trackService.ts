import { Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, Track } from 'src/type/track';
import { v4 } from 'uuid';
import { FavoritesService } from './app.favoritesService';

@Injectable()
export class TrackService {
  constructor(private readonly favoritesService: FavoritesService) {}
  private tracks: Array<Track> = [];

  getTracks(): Array<Track> {
    return this.tracks;
  }

  getTrack(inputId: string): Track | undefined {
    const findedTrack = this.tracks.find((track) => track.id === inputId);
    return findedTrack;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const createdTrackId = v4();
    const createdTrack: Track = {
      id: createdTrackId,
      ...createTrackDto,
    };
    this.tracks.push(createdTrack);
    return createdTrack;
  }

  changeTrack(inputId: string, updateTrackDto: UpdateTrackDto): Track | undefined {
    const editedTrack = this.tracks.find((track) => track.id === inputId);
    if (!editedTrack) return;
    Object.assign(editedTrack, updateTrackDto);
    return editedTrack;
  }

  resetTracksForDeletedArtist(inputAtristId: string) {
    const artistTracks = this.tracks.filter((track) => track.artistId === inputAtristId);
    artistTracks.map((track) => (track.artistId = null));
  }

  resetTracksForDeletedAlbum(inputAlbumId: string) {
    const albumTracks = this.tracks.filter((track) => track.albumId === inputAlbumId);
    albumTracks.map((track) => (track.albumId = null));
  }

  deleteTrack(inputId: string): Track | undefined {
    const deletedTrack = this.tracks.find((track) => track.id === inputId);
    if (!deletedTrack) return;

    this.favoritesService.deleteTrack(deletedTrack.id);

    const foundedTrackIndex = this.tracks.indexOf(deletedTrack);
    this.tracks.splice(foundedTrackIndex, 1);
    return deletedTrack;
  }
}
