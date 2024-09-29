const express = require('express');

const errorRouter = express.Router();

errorRouter.get('*',(req,res)=> {
    res.json({error:'404 route not found'})
})
errorRouter.post('*',(req,res)=> {
    res.json({error:'404 route not found'})
})
errorRouter.delete('*',(req,res)=> {
    res.json({error:'404 route not found'})
})
errorRouter.patch('*',(req,res)=> {
    res.json({error:'404 route not found'})
})

module.exports = errorRouter;