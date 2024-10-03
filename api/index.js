// imports
const express = require('express');
const userRouter = require('../routes/user');
const errorRouter = require('../routes/error');
const bodyParser = require('body-parser');
const db = require('../services/connectDb');
const blogRouter = require('../routes/blog');
require('dotenv').config();
var cors = require('cors')
const path = require('path');

let {PORT} = process.env



let origin = ['http://localhost:5173','http://localhost:3000','http://localhost:4173'];

var corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

//! middlewares
app.use(cors(corsOptions)); // allow commuication with FE

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // allow form fields
app.use(bodyParser.json({ limit: "50mb" })); // allow json fields

app.use('/api',[userRouter,blogRouter,errorRouter]);
// app.use('/api',errorRouter);

//? connect with react frontend
///>>>>>>>> DEPLOYMENT >>>>>>>>>>>>>>>>>
app.use(express.static(path.join(__dirname, "./client/dist")));

//>>>>>>>>> SERVE REACT INDEX.HTML EACH TIME THERE IS A GET REQUEST >>>>>>>>>>>>>>

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
//   res.setHeader("Access-Control-Allow-Origin", "*")
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "1800");
// res.setHeader("Access-Control-Allow-Headers", "content-type");
// res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

// routes or simple code logics


// app.get('/',(req,res)=> {
//      res.send("Express on Vercel");
// })





//start server

db(()=> {
    app.listen(PORT || 3000,()=> {
        console.log('Listening to requests on port '+ PORT || 8100)
    })

});


module.exports = app;
