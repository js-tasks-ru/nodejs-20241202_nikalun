export interface ILoggerService {
    senderEmail(data: string): void;
    smsGateway(data: string): void;
}

export enum LogPath {
    emails = 'emails',
    sms = 'sms',
}
