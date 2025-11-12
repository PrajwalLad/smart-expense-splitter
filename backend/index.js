import dotenv from 'dotenv'
dotenv.config();
import connectDB from './src/db/index.js';
import app from './app.js'

app.get('/', (req, res)=>{
    res.send('Welcome to the Splitter app!')
})

connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})
