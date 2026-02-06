// describing person function
function describePerson(name: string, age?: number) {
  if (age) {
    console.log(`Name: ${name}, Age: ${age}`);
  } else {
    console.log(`Name: ${name}, Age: Unknown`);
  }
}

// calculate price function
function calculatePrice(basePrice: number, discount: number = 0.1) {
  return basePrice * (1 - discount);
}

// Test calls
describePerson("Eve");
describePerson("Frank", 28);
console.log(calculatePrice(100)); // 90
console.log(calculatePrice(100, 0.2)); // 80
