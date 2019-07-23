const express = require('express')
const app = express()
const cors=require('cors')
const parser= require('body-parser')
const itemRoutes=require('./Routes/items')
const cartRoutes=require('./Routes/cart')

// apply json parser
app.use(parser.json());
// apply cors
app.use(cors());

//add routes to server
app.use('/items',itemRoutes);

app.use('/cartlist',cartRoutes)

app.listen(1234,()=>{
    console.log("Server Started at port 1234")
})