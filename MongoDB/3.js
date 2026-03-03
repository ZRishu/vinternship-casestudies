const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const senderId = ObjectId("SENDER_ID_HERE");
  const recipientId = ObjectId("RECIPIENT_ID_HERE");
  const originalTxId = ObjectId("ORIGINAL_TRANSACTION_ID");
  const refundAmount = 100;

  // Check recipient has enough balance to refund
  const recipient = db.users.findOne(
    { _id: recipientId },
    { session }
  );

  if (!recipient || recipient.balance < refundAmount) {
    throw new Error("Recipient has insufficient balance for refund");
  }

  // Add money back to sender
  db.users.updateOne(
    { _id: senderId },
    { $inc: { balance: refundAmount } },
    { session }
  );

  // Deduct money from recipient
  db.users.updateOne(
    { _id: recipientId },
    { $inc: { balance: -refundAmount } },
    { session }
  );

  // Update original transaction status
  db.transactions.updateOne(
    { _id: originalTxId },
    { $set: { status: "refunded" } },
    { session }
  );

  // Insert refund transaction log
  db.transactions.insertOne(
    {
      from: recipientId,
      to: senderId,
      amount: refundAmount,
      type: "refund",
      relatedTransaction: originalTxId,
      date: new Date(),
      status: "completed"
    },
    { session }
  );

  // Commit transaction
  session.commitTransaction();

} catch (error) {

  // If Any step fails, rollback everything
  session.abortTransaction();
  throw error;

} finally {
  session.endSession();
}