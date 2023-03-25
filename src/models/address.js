import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
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
