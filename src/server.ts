import http from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

const server = http.createServer(app);
dotenv.config({ path: ".env.local" });

const port = 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://assign:FenUtxsOXQQBaruq@cluster0.g8zp6.mongodb.net/libaryDb`
    );
    console.log("connected to mongoose using mongoose");
    server.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
