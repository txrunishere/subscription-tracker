import express from "express";

const app = express();

app.get("/", (_, res) => {
  return res.json({ success: true });
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on PORT: 8080");
});
