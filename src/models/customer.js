import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    phone: {
      type: String,
      required: true,
    },
    address: [{ type: Schema.Types.ObjectId, ref: "Address", require: true }],
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", require: true },
        unit: { type: Number, require: true },
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", require: true }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export default mongoose.model("Customer", CustomerSchema);
