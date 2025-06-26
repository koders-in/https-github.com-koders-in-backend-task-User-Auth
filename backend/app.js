import express from "express";
import cookieParser from "cookie-parser";

import userRoute from "./routes/auth.routes.js";
const app = express();


// logs req in console (in dev mode)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);




app.use("/api/auth",userRoute)

export { app };
