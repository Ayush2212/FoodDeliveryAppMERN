const express = require('express');
var bodyParser = require('body-parser')

const app= express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const connectDB= require('./db');
app.get('/', (req,res)=>{
    res.send('Hello ')

})


app.use(express.json())

app.use('/api', require('./Routes/DisplayData'))

app.use('/api', require('./Routes/CreateUser'));

app.use('/api', require('./Routes/OrderData'))

const startServer= async()=>{

    try {
        connectDB();
    } catch (error) {
        console.log(error);
    }
    app.listen(5500, ()=> console.log('server started at given port 5500'));
}

startServer();