const nodemailer = require('nodemailer');
var fs = require("fs")
class Email {
    constructor(){
        this.smtpSetup = {
            service :"gmail",
            auth :{
                user : "ibmtechtraining007@gmail.com",
                pass : "India@786"
            }
        }
        // configure the smtp settings
        this.mailer = nodemailer.createTransport(this.smtpSetup);
    }
    email(userObj){
        // in case sender isnt mentioned
        if(userObj.from == null){
            userObj.from = "ibmtechtraining007@gmail.com";
        }
        this.mailer.sendMail({
            from : userObj.from,
            to : userObj.to,
            subject : userObj.subject,
            /*text : emailBody, */
            html : userObj.body
        },(err,response)=>{
            if(err){
                console.log(err);
                return "Unable to send email";
            }else{
                console.log('Email Sent');
                return "Email Sent Successfully";
            }
        })
    }
    emailWithAttachment(userObj,data){
        // in case sender isnt mentioned
        if(userObj.from == null){
            userObj.from = "ibmtechtraining007@gmail.com";
        }
        let invoicedata=""
        let i=0;
        data.items.forEach((u)=>{
            i++
            invoicedata+=`item ${i} Name of item = ${u.name}
                          price = ${u.price}
                          Quantity= ${u.quantity}
                          Total Amount= ${u.finalprice}==================================
                          ==============================================================`

        })
        fs.writeFile("./services/invoice.txt", invoicedata, (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log(__dirname)
            console.log("File has been created");
        })
        this.mailer.sendMail({
            from : "ibmtechtraining007@gmail.com",
            to : userObj.to,
            subject : userObj.subject,
            /*text : emailBody, */
            html : userObj.body,
            attachments: [
                {
                    filename : 'invoice.txt',
                    path : __dirname +'/' +'invoice.txt'
                    /*,content: 'Hello how r u' */
                }
            ] 
        },(err,response)=>{
            if(err){
                console.log(err);
                return "Unable to send email";
            }else{
                console.log('Email Sent');
                return "Email Sent Successfully";
            }
        })
    }
}
module.exports.Email = Email;