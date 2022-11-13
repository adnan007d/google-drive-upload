import express from "express";
import cors from "cors";
import formRouter from "./routes/form";

const PORT = process.env.PORT || 6969;

const app = express();

app.use(cors());

app.use("/api/form", formRouter);

app.get("/", (_, res) => res.json({ message: "WEEEEEEEEEEE" }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
