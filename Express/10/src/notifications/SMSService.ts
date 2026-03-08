import { Service } from "typedi";
import { NotificationService } from "./NotificationService";

@Service()
export class SMSService implements NotificationService {
  async send(to: string, message: string) {
    console.log(`SMS sent to ${to}: ${message}`);
  }
}