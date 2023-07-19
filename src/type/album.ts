export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export type CreateAlbumDto = Omit<Album, 'id'>;
export type UpdateAlbumDto = Omit<Album, 'id'>;
