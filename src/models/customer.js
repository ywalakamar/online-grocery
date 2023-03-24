import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  email: String,
  password: String,
  salt: String,
  phone: String,
  address: [{ type: Schema.Types.ObjectId, ref: "Address", require: true }],
});

export default mongoose.model("Customer", CustomerSchema);
