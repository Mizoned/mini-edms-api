import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import {ApiError, ApiException} from "../exeptions/ApiException";

interface ApiErrorResponse {
    message: string,
    errors?: ApiError[],
    statusCode: number,
}
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        if (exception instanceof ApiException) {
            const responseBody: ApiErrorResponse = {
                message: exception.message,
                errors: exception.errors,
                statusCode: status,
            }

            response.status(status).json(responseBody);
            return;
        } else if(exception instanceof HttpException) {
            const responseBody: ApiErrorResponse = {
                message: exception.message,
                statusCode: status,
            }

            response.status(status).json(responseBody);
            return;
        }

        console.log(exception)

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Произошла непредвиденная ошибка на сервере',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        });
    }
}