const fs = require('fs');
const key = fs.readFileSync('./ssl/cert.key');
const cert = fs.readFileSync('./ssl/cert.pem');
const errorMiddleware = require('./middleware/errormw');
const express = require('express')
const https = require('https');
const authRoute =require('./routes/auth')
const mongoose = require('mongoose')
const app = express();
const server = https.createServer({key: key, cert: cert }, app);
require('dotenv').config()
const PORT = 3000
const cors = require('cors')
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use("/api/auth", authRoute)
app.use(errorMiddleware);
async function runServer(){
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log("Connected to MongoDB"))
        server.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}
//inverse binary tree
runServer();