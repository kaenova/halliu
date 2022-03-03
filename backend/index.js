// Loading dotenv
import dotenv from "dotenv";
import initRoutes from "./routes/init.js";
import { sequelize } from "./models";

// Load env variables
dotenv.config();

// Sync database model
try {
  sequelize.sync()
} catch (e) {
  console.log(e)
}

const app = initRoutes();
const PORT = process.env["PORT"] || 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
