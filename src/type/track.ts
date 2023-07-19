export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export type CreateTrackDto = Omit<Track, 'id'>;
export type UpdateTrackDto = Partial<Omit<Track, 'id'>>;
