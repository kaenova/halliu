import modelInit from "../model/test/associate.js";
import db from "./index.js";

function InitDB() {
  console.log("Testing Connection");
  try {
    db.authenticate();
    console.log("DB is connected");
  } catch (err) {
    console.log("DB is fail to connect");
    throw err;
  }
  
  try {
    modelInit();
  } catch (err) {
    throw err;
  }
}

export default InitDB