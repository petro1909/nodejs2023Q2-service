import { IsNotEmpty, IsNumber, IsPositive, IsString, Max, ValidateIf } from 'class-validator';
import { isUUID } from 'src/validation/idValidator';

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
  @isUUID({ message: 'value is not uuid type' })
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
  @isUUID({ message: 'value is not uuid type' })
  artistId: string | null;
}
