import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Max, ValidateIf } from 'class-validator';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(new Date().getFullYear())
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Max(new Date().getFullYear())
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;
}
