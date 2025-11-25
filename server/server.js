import { app } from "./app.js";
import { PORT, FRONTEND_URL } from "./config.js";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend origin: ${FRONTEND_URL}`);
});
