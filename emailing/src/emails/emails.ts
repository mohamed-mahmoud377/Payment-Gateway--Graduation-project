const nodemailer = require("nodemailer");
const pug = require('pug')
const path = require('path')
const htmlToText = require('html-to-text')
// this is just beautiful
export  class Email{
    to: string;
    name:string;
    url?:string;
    from:string;



    constructor(email:string,name:string,url?:string) {
        this.to = email;
        this.name =name.split(' ')[0];
        this.url = url;
        this.from = `hash cash <${process.env.EMAIL_FROM}>`;
    }

    newTransport(){
        if (process.env.NODE_ENV==='production'){

            return  nodemailer.createTransport({
                service:'SendGrid', // because it is all ready defined not like above with mailTrap and note that gmail is also defined
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }else{

            return  nodemailer.createTransport({ // nice built in core node-module
                host: process.env.EMAIL_HOST,  // this host and port we get from mail trap which is our dev env for emails sending
                port: process.env.EMAIL_PORT, // try all passable ports till it work will fine them in mail-trap website
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
        }

    }

    async send(templateName:string,subject:string,otp?:string){  // templateName which is a put we send a nice formatted email
        //1 Render HTML based on a pug template
        let html;
        if (templateName==='otp-signup'){
             html =pug.renderFile(path.join(__dirname,`../views/emails/${templateName}.pug`),{
                firstName: this.name,
                url: this.url,
                subject,
                otp
            })
        }

        if (templateName==='passwordReset'){
             html =pug.renderFile(path.join(__dirname,`../views/emails/${templateName}.pug`),{
                firstName: this.name,
                url: this.url,
                subject
            })
        }


        //2 define email options
        const emailOptions = { // we have to give this option to the email transporter so it could be sent
            from: this.from,
            to: this.to,
            subject,
            html,
            text:htmlToText.fromString(html)
        };
        //crate a transport and send email
        await this.newTransport().sendMail(emailOptions); // sendMail is a transport object function which takes the options and should awaited


    }
    async sendOtpSignup(opt:number){
        await this.send('otp-signup' , `Email verification code`,String(opt))
    }
    async sendWelcome(){
        await this.send('welcome' , 'Welcome to the natours Family')
    }

    async sendPasswordRest(){
        await this.send('passwordReset' ,'Your password reset token (valid for only 10 minutes)')
    }
}



