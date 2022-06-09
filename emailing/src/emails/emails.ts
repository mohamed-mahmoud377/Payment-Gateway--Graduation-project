const nodemailer = require("nodemailer");
const pug = require('pug')
const path = require('path')
const htmlToText = require('html-to-text')



// this email class is really poorly designed and this really tills you that you have to consider that you extend you class
// and add more features
//  you will have to get back to this and refactor the hell aut of it
export  class Email{
    to: string;
    name:string;
    url?:string;
    from:string;
    reason?:string;



    constructor(email:string,name:string,url?:string, reason?:string) {
        this.to = email;
        this.name =name.split(' ')[0];
        this.url = url;
        this.from = `hash cash <${process.env.GMAIL_EMAIL}>`;
        this.reason = reason;
    }

    newTransport(){
        if (process.env.NODE_ENV==='production'){

            return  nodemailer.createTransport({
                service:'gmail', // because it is all ready defined not like above with mailTrap and note that gmail is also defined
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASSWORD
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

    async send(templateName:string,subject:string,otp?:string,reason?:string){  // templateName which is a put we send a nice formatted email
        //1 Render HTML based on a pug template
        let html;
        if (templateName==='otp-login'){
            html =pug.renderFile(path.join(__dirname,`../views/emails/${templateName}.pug`),{
                firstName: this.name,
                url: this.url,
                subject,
                otp
            })
        }
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
        if(templateName==='applicationApproved'){
            html =pug.renderFile(path.join(__dirname,`../views/emails/${templateName}.pug`))
        }

        if (templateName==='applicationDeclined'){
            html =pug.renderFile(path.join(__dirname,`../views/emails/${templateName}.pug`),{
                reason
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
    async sendOtpLogin(opt:number){
        await this.send('otp-login' , `Your OTP password`,String(opt))
    }
    // async sendWelcome(){
    //     await this.send('welcome' , 'Welcome to the hashcash Family')
    // }
    async sendApprovedApplicationMsg(){
        await this.send('applicationApproved',"You application has been approved")
    }
    async sendDeclinedApplicationMsg(reason:string){
        await this.send('applicationDeclined',"You application has been declined",undefined,String(reason))
    }

    async sendPasswordRest(){
        await this.send('passwordReset' ,'Your password reset token (valid for only 10 minutes)')
    }
}



