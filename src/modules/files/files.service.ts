import {HttpStatus, Injectable} from '@nestjs/common';
import {ApiException} from "../../common/exeptions/ApiException";
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileExtension = path.extname(file.originalname);

            console.log('Файлы', fileExtension)
            const fileName = `${uuid.v4()}${fileExtension}`;
            const filePath = path.resolve(__dirname, '../../', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            throw new ApiException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
