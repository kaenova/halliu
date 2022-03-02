// Loading dotenv
import dotenv from 'dotenv';
import express from 'express';

// Load env variables
dotenv.config()

const app = express();
  
app.get('/',(req,res) => {
    res.send('GeeksforGeeksas');
})
  
const PORT = process.env['PORT'] || 3001;

app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})