import { ValidationOptions, registerDecorator } from 'class-validator';
import { validate as isuuid } from 'uuid';
export function isUUID(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsUUID',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isuuid(value);
        },
      },
    });
  };
}
