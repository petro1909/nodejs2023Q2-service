import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class CreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;
}

export class UpdateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;
}
