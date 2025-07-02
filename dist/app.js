"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controller/book.controller");
const borr_controller_1 = require("./app/controller/borr.controller");
const error_1 = require("./app/middleware/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Library is live on Vercel!");
});
app.use("/api/books", book_controller_1.bookRouters);
app.use("/api/borrow", borr_controller_1.borrowRoutes);
// Remove duplicate route
// app.get("/", (_req: Request, res: Response) => {
//   res.send("hello world libery is open now ");
// });
app.use(error_1.globalErrorHandler);
exports.default = app;
