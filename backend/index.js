// Loading dotenv
import dotenv from "dotenv";
import initRoutes from "./routes/init.js";

// Load env variables
dotenv.config();

const app = initRoutes();
const PORT = process.env["PORT"] || 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
