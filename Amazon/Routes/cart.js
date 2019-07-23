const server = require('express').Router();
const CartService=require('../services/cartService')
const cartService = new CartService();

server.get('/',(req,res)=>{
    res.setHeader('content-type','application/json')
    res.end(JSON.stringify({
        cart:cartService._all()
    }))
})

server.get('/add',(req,res)=>{
    res.setHeader('content-type','application/json')
    console.log("added")
    res.end(cartService._add(req.headers.id))
})

server.post('/mail',(req,res)=>{
    console.log("reached")
    console.log(req.body);
    res.json({
         data : cartService.mail(req.body)
    })
})

module.exports=server;