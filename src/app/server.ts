import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const port = 5000;
let server: Server;
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;
console.log(dbName, dbPass);

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbName}:${dbPass}@cluster0.g8zp6.mongodb.net/libaryDb?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("connected to mongoosse using mongoosse");
    server = app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
