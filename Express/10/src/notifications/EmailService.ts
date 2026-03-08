import { Service } from "typedi";
import { NotificationService } from "./NotificationService";

@Service()
export class EmailService implements NotificationService {
  async send(to: string, message: string) {
    console.log(`Email sent to ${to}: ${message}`);
  }
}