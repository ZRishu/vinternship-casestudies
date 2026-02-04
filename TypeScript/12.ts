// 1. Simple Declaration & Optional Parameter
function displayMember(id: number, name: string, email?: string): void {
  console.log(`ID: ${id}, Name: ${name}`);
  if (email) console.log(`Email: ${email}`);
}

// 2. Rest Parameters for Fines Tally
function calculateFines(...fines: number[]): number {
  let total = 0;
  for (let fine of fines) total += fine;
  return total;
}

// 3. Default Parameter for Discount
function membershipFee(price: number, discountRate: number = 0.1): number {
  return price - price * discountRate;
}

// 4. Anonymous Function & Callback
const vipGreet = (name: string) => console.log(`Welcome VIP ${name}!`);

// 7. Function Type & Alias
type VisitorFormatter = (name: string) => void;
let consoleGreet: VisitorFormatter = (n) => console.log(`Hello, ${n}!`);

// 5. Recursion: Factorial (for demonstration)
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Calling displayMember function for two members
displayMember(1, "Ramesh", "ramesh@gmail.com");
displayMember(2, "Rahul");

// Calculating total fines
const fine = calculateFines(5, 10, 2.5);
console.log(`Total fine: ${fine}`);

// Computing membership fee with default discount and custome discount
const defaultDiscount = membershipFee(100);
const customeDiscount = membershipFee(100, 0.2);
console.log(`Price after default discount: $${defaultDiscount}`);
console.log(`Price after 20% discount: $${customeDiscount}`);

// Greeting visitors with vipGreet and consoleGreet
vipGreet("Alice");
vipGreet("Bob");
consoleGreet("Alice");
consoleGreet("Bob");

// Counting factorial of 5
const fact = factorial(5);
console.log(`Factorial of 5 is ${fact}`);
