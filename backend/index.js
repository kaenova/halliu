// Loading dotenv
import dotenv from 'dotenv';
import init from './routes/init.mjs'
import db from './db/index.mjs'

// Load env variables
dotenv.config()

const app = init()
const PORT = process.env['PORT'] || 3001;

app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})