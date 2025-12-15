import express from "express";
import cors from "cors";
import route from "./routes/auth.route";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/todoapp", route);

export default app;
