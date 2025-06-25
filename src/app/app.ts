import express, { Application, Request, Response } from "express";
import { bookRouters } from "./controller/book.controller";
import { borrowRoutes } from "./controller/borr.controller";
import { globalErrorHandler } from "./middleware/error";

const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRouters);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world libery is open now ");
});

app.use(globalErrorHandler);
export default app;
