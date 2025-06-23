import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interface/borr.interface";

export const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    dueDate: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
