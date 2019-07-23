const cartitems=require('../db/cartitems')
const electronicitems=require('../db/electronic')
const Email = require('./emailservice').Email;
const emailService = new Email();
class ItemServices{
    constructor(){
        this.cartitems=cartitems;
        this.electronicitems=electronicitems
    }
    _all(){

        return this.cartitems;
    }
    _add(id){
        console.log("added")
        electronicitems.forEach((u)=>{
            console.log("inside items")
            if(u.id==id){
                let newid=u.id
                let newname=u.name
                let newcategory=u.category
                let newdes=u.description
                let newprice=u.price
                let newquantity=1
                let tempdata={
                    id:1,
                    name: newname,
                    category: newcategory ,
                    description: newdes,
                    quantity:newquantity,
                    price:newprice
                    }
                cartitems.push(tempdata)
                console.log(cartitems)
                console.log("Added succesfully")
            }
        })
    }

    mail(data){
        console.log(data.items)
        let checkObj ={
            subject : "Your Bill",
            body : `<div>Dear <b>user</b></div>
                    <div>Thank you for buying with us. Your invoice is below/div>
                    <div></div>`,
            from : null,
            to : "deepakm8796@gmail.com"
        }
        emailService.emailWithAttachment(checkObj,data);
    }
}

module.exports=ItemServices