import z from "zod";
import express from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borr.model";

export const borrowRoutes = express.Router();

const borrowZodSchema = z.object({
  book: z.string({ required_error: "Book ID is required" }),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int()
    .positive("Quantity must be a positive integer"),
  dueDate: z.string({ required_error: "Due date is required" }),
});

borrowRoutes.post("/", async (req, res, _next) => {
  try {
    const {
      book: bookId,
      quantity,
      dueDate,
    } = await borrowZodSchema.parseAsync(req.body);
    const book = await Book.findById(bookId);

    if (!book) {
      throw new Error("No Book Found");
    }

    if (book.copies < quantity) {
      res.status(400).json({
        sucess: false,
        message: "Not enough Copies avilable",
      });
    }

    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    await book.save();

    // create a borrows books

    const postToBorrowData = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      sucess: true,
      message: "Book borrowed successfully",
      data: postToBorrowData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      messgae: `Error message is ${error}`,
    });
  }
});

borrowRoutes.get("/", async (_req, res, next) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: {
            $sum: "$quantity",
          },
        },
      },

      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },

      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      sucess: true,
      message: "Borrowed books summary retrieved successfull",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
});
