function processTransaction(
  amount: number,
  description: string = "Description is not provided.",
  isCredit: boolean,
) {
  if (amount < 0) {
    throw new Error("Amount is negative.");
  }
  console.log(
    `Transaction Summary:
Amount: ${amount}
Description: ${description}
Credit: ${isCredit}
`
  );
}

processTransaction(50, "1 Coke is purchased", false);
processTransaction(50, undefined, true);
