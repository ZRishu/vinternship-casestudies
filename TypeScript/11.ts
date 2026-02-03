// Dummy Data
type Transaction = {
  id: number;
  type: "checkout" | "return" | "cancelled" | "priority";
};

const transactions: Transaction[] = [
  { id: 1, type: "checkout" },
  { id: 2, type: "cancelled" },
  { id: 3, type: "return" },
  { id: 4, type: "priority" },
  { id: 5, type: "checkout" },
];

const inventory: { [title: string]: number } = {
  "The Hobbit": 3,
  "1984": 5,
  "TypeScript Guide": 2,
};

const visitors: string[] = ["Alice", "Bob", "Carol"];

// Added counter for each transaction type using for loop and object
const transactionCount: Record<Transaction["type"], number> = {
  checkout: 0,
  return: 0,
  cancelled: 0,
  priority: 0,
};

function countTransactionsType() {
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    transactionCount[t.type]++;
  }
  console.log(transactionCount);
}
countTransactionsType();

// Used infinite loop with break condition for priority transaction
function breakAtPriority() {
  let index = 0;
  while (true) {
    const t = transactions[index];
    console.log(`Transaction Type: ${t.type}`);
    if (t?.type === "priority") {
      break;
    }
    index++;
  }
}
breakAtPriority();

// Modified do while loop to handle dynamic queue
let queue = [...transactions];
let pendingReturns = 0;
do {
  const tx = queue.shift()!;
  if (tx.type === "return") {
    console.log(`Handling return transaction ${tx.id}`);
    pendingReturns++;
  }
} while (queue.length > 0);
console.log(`Pending returns: ${pendingReturns}`);

// Used for in loop to reset all inventory counts to 0
for (const title in inventory) {
  inventory[title] = 0;
}
console.log(inventory);

// Used for loop to display visitor names in reverse
for (let i = visitors.length - 1; i >= 0; i--) {
  console.log(visitors[i]);
}
