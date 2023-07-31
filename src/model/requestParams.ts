import { IsNotEmpty, IsString } from 'class-validator';
import { isUUID } from 'src/validation/idValidator';

export class RequestParams {
  @IsNotEmpty()
  @IsString()
  @isUUID({ message: 'value is not uuid type' })
  id: string;
}
