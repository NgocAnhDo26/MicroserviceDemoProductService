import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import router from "./routes";
import { connectDB } from "./config/db.config";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});