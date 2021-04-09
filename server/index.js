import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    author: "Coding with ersin",
    message: "Selamunaleyküm",
  });
});

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started in this port :" + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
