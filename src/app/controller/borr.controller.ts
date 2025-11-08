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

borrowRoutes.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    console.log(req.body);
    try {
      const {
        book: bookId,
        quantity,
        dueDate,
      } = await borrowZodSchema.parseAsync(req.body);
      const book = await Book.findById(bookId);

      if (!book) {
        res.status(404).json({ success: false, message: "No Book Found" });
        return;
      }

      if (book.copies <= 0) {
        res.status(400).json({
          success: false,
          message: "No copies available to borrow",
        });
        return;
      }

      book.copies -= quantity;
      if (book.copies === 0) {
        book.available = false;
      }

      await book.save();

      const postToBorrowData = await Borrow.create({
        book: bookId,
        quantity,
        dueDate: new Date(dueDate),
      });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: postToBorrowData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

borrowRoutes.get(
  "/",
  async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
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
              name: "$book.name",
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);
