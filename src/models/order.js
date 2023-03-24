import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: String,
  customerId: String,
  amount: Number,
  status: String,
  transactionId: String,
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      unit: { type: Number, require: true },
    },
  ],
});

export default mongoose.model("Order", OrderSchema);
