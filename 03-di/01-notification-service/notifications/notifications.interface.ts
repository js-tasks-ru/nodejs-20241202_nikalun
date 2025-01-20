export interface INotificationsService {
    sendEmail(to: string, subject: string, message: string): void;
    sendSMS(to: string, message: string): void;
}
