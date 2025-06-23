import { Server } from "http";

import app from "./app";
import mongoose from "mongoose";

const port = 5000;
let server: Server;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://mongosse-app:UkPD8J8wPfpILcTq@cluster0.g8zp6.mongodb.net/mongoos-app?retryWrites=true&w=majority&appName=Cluster0"
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
