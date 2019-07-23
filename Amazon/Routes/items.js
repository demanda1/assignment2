const server = require('express').Router();
const ItemService=require('../services/itemService')
const itemService = new ItemService();


server.get('/',(req,res)=>{
    res.setHeader('content-type','application/json')
    res.end(JSON.stringify({
        items:itemService._all()
    }))
})

module.exports=server;