import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateIf } from 'class-validator';
import { isUUID } from '../validation/idValidator';

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
  @isUUID({ message: 'value is not uuid type' })
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @isUUID({ message: 'value is not uuid type' })
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
  @isUUID({ message: 'value is not uuid type' })
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  @isUUID({ message: 'value is not uuid type' })
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  duration: number;
}
