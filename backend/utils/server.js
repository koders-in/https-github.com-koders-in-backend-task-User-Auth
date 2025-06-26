import { app } from "../app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    const baseURL = `http://localhost:${PORT}`;
    console.log(`Server is running at: ${baseURL}`);
  });
});
