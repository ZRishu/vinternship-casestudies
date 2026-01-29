// Defined CustomerID type
type CustomerID = string;

// Defined Customer type
type Customer = {
  id: CustomerID;
  name: string;
  email?: string;
};

// Created a Customer object
const customer: Customer = { id: "1", name: "Alice" };

// Defined OrderStatus type
type OrderStatus = "pending" | "shipped" | "returned";

// Defined ProcessOrder type which takes orderID and a callback function
type ProcessOrder = (
  orderID: number,
  callback: (status: OrderStatus) => void,
) => void;

// Created processOrder function of type ProcessOrder
const processOrder: ProcessOrder = (orderId, callback) => {
  console.log(`Processing Order with ID: ${orderId}`);
  callback("pending");
};

// Called processOrder function
processOrder(3, (status) => {
  console.log(`Order Status: ${status}`);
});

// Defined Container type which has value and timestamp of creation
type Container<T> = { value: Customer; timestamp: Date };

// Created cusotmerContainer
const customerContainer: Container<Customer> = {
  value: customer,
  timestamp: new Date(),
};

// Print customer Container
console.log(customerContainer)
