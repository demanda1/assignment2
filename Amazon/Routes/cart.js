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
    res.json({
         data : cartService.mail(req.body)

    })
})

server.put('/update',(req,res)=>{
    console.log("reached")
    res.json({
         data : cartService.update()
    })
})

server.post('/inventory',(req,res)=>{
    res.setHeader('content-type','application/json')
    console.log("inventory")
    cartService.inventory(req.body)
})

module.exports=server;