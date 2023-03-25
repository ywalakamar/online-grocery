import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    street: String,
    postalCode: String,
    city: String,
    country: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export default mongoose.model("Address", AddressSchema);
