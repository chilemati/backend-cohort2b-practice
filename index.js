// imports
const express = require('express');
const userRouter = require('./routes/user');
const errorRouter = require('./routes/error');
const bodyParser = require('body-parser');
const db = require('./services/connectDb');
const blogRouter = require('./routes/blog');
require('dotenv').config();
var cors = require('cors')

let {PORT} = process.env



let origin = ['http://localhost:5173'];
var corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const app = express();

//! middlewares
app.use(cors(corsOptions))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // accept form from frontend

// parse application/json
app.use(bodyParser.json()) // accept json from frontend

app.use('/api',[userRouter,blogRouter,errorRouter]);
// app.use('/api',errorRouter);


// routes or simple code logics

app.get('/',(req,res)=> {
    res.json({home:'Home page'})
})





//start server

db(()=> {
    app.listen(PORT || 8100,()=> {
        console.log('Listening to requests on port '+ PORT || 8100)
    })

});
