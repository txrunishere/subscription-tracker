import express from "express";

const app = express();

app.get("/", (_, res) => {
  return res.json({ success: true });
});

export default app;
