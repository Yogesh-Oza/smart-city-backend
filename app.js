import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import jobRoute from "./routes/jobs.route.js";
import placeRoute from "./routes/place.route.js";
import testRoute from "./routes/test.route.js";
import morgan from "morgan";
import dotenv from "dotenv";
import userrouter from "./routes/users.route.js";
import carouselrouter from "./routes/carousel.route.js";
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/place", placeRoute);
app.use("/api/job", jobRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userrouter);
app.use("/api/carousel", carouselrouter);

app.use(morgan("combined"));

console.log(process.env.CLIENT_URL);
console.log(process.env.DATABASE_URL);
console.log(process.env.PORT);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running at port", port);
});
