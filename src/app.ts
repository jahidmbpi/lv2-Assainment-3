import express, { Application, Request, Response } from "express";
import { bookRouters } from "./app/controller/book.controller";
import { borrowRoutes } from "./app/controller/borr.controller";
import { globalErrorHandler } from "./app/middleware/error";
import cors from "cors";
const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Library is live on Vercel!");
});

app.use("/api/books", bookRouters);
app.use("/api/borrow", borrowRoutes);

app.use(globalErrorHandler);

export default app;
