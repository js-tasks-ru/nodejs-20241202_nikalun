import { Injectable } from "@nestjs/common";
import { appendFile } from "node:fs/promises";
import { ILoggerService, LogPath } from "./Logger.interface";

const emailsLogPath = require('path').join(__dirname, '..', '..', 'test', 'emails.txt');
const smsLogPath = require('path').join(__dirname, '..', '..', 'logs', 'sms.txt');
const errorsLogPath =  require('path').join(__dirname, '..', '..', 'logs', 'errors.txt');
const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';

@Injectable()
export class LoggerService implements ILoggerService {
    public async senderEmail(data: string) {
        await this._write(data, LogPath.emails);
    }

    public async smsGateway(data: string) {
        await this._write(data, LogPath.sms);
    }

    private async _write(data: string, type: LogPath) {
        try {
            console.log(data);
            const path = type === LogPath.emails ? emailsLogPath : smsLogPath;
            await appendFile(path, this._preparedWriteFileData(data));
        } catch (error: any) {
            console.error(error);
            await appendFile(errorsLogPath, this._preparedWriteFileData(error));
        }
    }

    private _preparedWriteFileData(data: string) {
        return new Uint8Array(Buffer.from(`${data}${newLineChar}`));
    }
}
