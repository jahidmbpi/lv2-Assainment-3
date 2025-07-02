"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouters = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouters = express_1.default.Router();
exports.bookRouters.post("/create-book", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        const data = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "book created succefully ",
            data,
        });
    }
    catch (error) {
        // console.log(error);
        next(error);
    }
}));
exports.bookRouters.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookAuthor = req.query.author;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.order === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (bookAuthor) {
            query.author = bookAuthor;
        }
        const data = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.get("/:bookID", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.bookID;
        const data = yield book_model_1.Book.findById(bookID);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully ",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.put("/:bookID", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.bookID;
        const updatedBody = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookID, updatedBody, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "book updated  succefully ",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.delete("/:bookID", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.bookID;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookID);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
