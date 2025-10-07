import dotenv from 'dotenv'
import connectDB from './src/db/index.js';
import app from './app.js'

dotenv.config();

app.get('/', (req, res)=>{
    res.send('Welcome to the Splitter app!')
})

connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})
