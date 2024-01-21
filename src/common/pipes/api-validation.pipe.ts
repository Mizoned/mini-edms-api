import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ApiException } from "../exeptions/ApiException";

@Injectable()
export class ApiValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToInstance(metadata.metatype, value, { });

        if (value && metadata.metatype !== String) {
            const validatedErrors = await validate(obj);

            if (validatedErrors.length) {
                let errors = validatedErrors.map(error => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]]
                }));

                throw new ApiException('Ошибка валидации полей', HttpStatus.BAD_REQUEST, errors);
            }
        }

        return value;
    }
}