// Payment Gateway interface
interface PaymentGateway {
  processPayment(amount: number): Promise<boolean>;
}

// Payment Processor class
class PaymentProcessor {
  constructor(private gateway: PaymentGateway) {}

  async pay(amount: number): Promise<void> {
    const success = await this.gateway.processPayment(amount);
    if (success) {
      console.log("Payment successful!");
    } else {
      console.log("Payment failed.");
    }
  }
}


// Bank Transfer gateway class
class BankTransferGateway implements PaymentGateway {
  async processPayment(amount: number): Promise<boolean> {
    console.log(`Processing payment of $${amount}.`);
    return true;
  }
}

// Testing payment via Bank Transfer gateway
const bankTransferGateway = new BankTransferGateway();
const testProcessor1 = new PaymentProcessor(bankTransferGateway);
testProcessor1.pay(100);


// Mock payment gateway class
class MockGateway implements PaymentGateway {
  async processPayment(amount: number): Promise<boolean> {
    console.log(`Mock processing payment of $${amount}.`);
    return false;
  }
}

// Testing failed payment via Mock gateway class
const mockGateway = new MockGateway();
const testProcessor2 = new PaymentProcessor(mockGateway);
testProcessor2.pay(50);
