import "reflect-metadata"; 
import { Container } from "typedi";
import { AppointmentService } from "./appointments/AppointmentService";
import { EmailService } from "./notifications/EmailService";
import { SMSService } from "./notifications/SMSService";

// Swap to EmailService for notifications without changing AppointmentService!
Container.set(SMSService, new EmailService());

const appointmentService = Container.get(AppointmentService);
void appointmentService.bookAppointment("alice@example.com", "Monday 10am", 50);
