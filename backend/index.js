// Loading dotenv
import dotenv from "dotenv";
import initRoutes from "./routes/init.js";
import initDB from "./db/init.js";

// Load env variables
dotenv.config();

// Database connection
initDB()

const app = initRoutes();
const PORT = process.env["PORT"] || 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
