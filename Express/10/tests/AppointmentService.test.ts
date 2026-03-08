import "reflect-metadata";
import * as assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { Container } from "typedi";
import { AppointmentService } from "../src/appointments/AppointmentService";
import { type NotificationService } from "../src/notifications/NotificationService";
import { type BillingService } from "../src/billing/BillingService";
import { SMSService } from "../src/notifications/SMSService";
import { StripeBillingService } from "../src/billing/StripeBillingService";

// 1. Create our isolated mock classes
class MockNotifier implements NotificationService {
  messages: string[] = [];
  async send(to: string, message: string) {
    this.messages.push(`${to}: ${message}`);
  }
}

class MockBilling implements BillingService {
  charges: string[] = [];
  async charge(patient: string, amount: number) {
    this.charges.push(`${patient}: $${amount}`);
  }
}

describe("AppointmentService", () => {
  // Clean up the IoC container after every test to ensure test isolation
  afterEach(() => {
    Container.reset();
  });

  it("should send notification and charge patient on booking", async () => {
    // 2. Instantiate our mocks
    const mockNotifier = new MockNotifier();
    const mockBilling = new MockBilling();

    // 3. Override the default injections in TypeDI
    Container.set(SMSService, mockNotifier);
    Container.set(StripeBillingService, mockBilling);

    // 4. Retrieve the service (TypeDI will inject our mocks instead of the real classes)
    const service = Container.get(AppointmentService);

    // 5. Execute the business logic
    await service.bookAppointment("bob@example.com", "Tuesday 2pm", 75);

    // 6. Assert that the mocks recorded the expected actions
    assert.equal(mockBilling.charges.includes("bob@example.com: $75"), true);
    assert.equal(
      mockNotifier.messages.includes(
        "bob@example.com: Your appointment is booked for Tuesday 2pm",
      ),
      true,
    );
  });
});
