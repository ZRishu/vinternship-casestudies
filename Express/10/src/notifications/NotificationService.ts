export interface NotificationService {
  send(to: string, message: string): Promise<void>;
}