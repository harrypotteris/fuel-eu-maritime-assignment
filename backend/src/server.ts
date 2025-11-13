import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routesRouter from "./adapters/inbound/http/routesRouter";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API prefix
app.use("/api", routesRouter);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
