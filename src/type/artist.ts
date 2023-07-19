export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export type CreateArtistDto = Omit<Artist, 'id'>;
export type UpdateArtistDto = Omit<Artist, 'id'>;
