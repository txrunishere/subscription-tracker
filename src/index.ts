import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT, () => {
  console.log(
    `Subscription tracker API is running on http://localhost:${PORT}`,
  );
});
