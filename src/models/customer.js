import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  email: String,
  password: String,
  salt: String,
  phone: String,
  address: [{ type: Schema.Types.ObjectId, ref: "Address", require: true }],
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
      unit: { type: Number, require: true },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order", require: true }],
});

export default mongoose.model("Customer", CustomerSchema);
