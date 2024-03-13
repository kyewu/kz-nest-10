import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// @IsValidValueInArr(['asc', 'desc'])
export function IsValidValueInArr(
  validValues: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidValueInArr',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [validValues],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // console.log('value:', value); // value: OrderType { order: 'asc111', order2: 'acs22' }
          /**
           *@param args
           * {
            targetName: 'GetCoursesByTypeDto',
            property: 'order',
            object: GetCoursesByTypeDto {
              page: 1,
              size: 10,
              order: OrderType { order: 'asc111', order2: 'acs22' }
            },
            value: OrderType { order: 'asc111', order2: 'acs22' },
            constraints: [ [ 'asc', 'desc' ] ]
          }
           * */
          const [relatedPropertyName] = args.constraints; // ['asc','desc']
          for (const key in value) {
            if (!relatedPropertyName.includes(value[key])) {
              return false;
            }
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `The dynamic property '${args.property}', should is the member of [${args.constraints}]`;
        },
      },
    });
  };
}
