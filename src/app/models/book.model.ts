import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

// তারপর schema:
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    copies: { type: Number, required: true, min: 0, default: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const Book = model<IBook>("Book", bookSchema);
