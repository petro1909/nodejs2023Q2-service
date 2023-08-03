import { IsNotEmpty, IsString } from 'class-validator';
import { isUUID } from '../validation/idValidator';

export class RequestParams {
  @IsNotEmpty()
  @IsString()
  @isUUID({ message: 'value is not uuid type' })
  id: string;
}
