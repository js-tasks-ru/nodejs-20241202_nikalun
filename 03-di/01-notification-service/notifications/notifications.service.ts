import { Injectable, NotFoundException } from "@nestjs/common";
import { INotificationsService } from "./notifications.interface";
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class NotificationsService implements INotificationsService {
    constructor(
        private _loggerService: LoggerService,
    ) {}
    public sendEmail(to: string, subject: string, message: string) {
        const isThrowException = !to || !subject || !message;
        if (isThrowException) throw new NotFoundException();
        const email = `Email sent to ${to}: [${subject}] ${message}`;

        this._loggerService.senderEmail(email).then();
    }

    public sendSMS(to: string, message: string) {
        const isThrowException = !to || !message;
        if (isThrowException) throw new NotFoundException();
        const sms = `SMS sent to ${to}:  ${message}`;

        this._loggerService.smsGateway(sms).then();
    }
}
