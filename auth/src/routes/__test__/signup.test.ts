import request from "supertest";
import {app} from "../../app";
import {Merchant} from "../../models/merchant";
import {ErrorCodes} from "../../errors/types/errorCodes";
import {natsWrapper} from "../../nats/nats-wrapper";


const url = '/api/users/signup'
it('should sign up if all conditionals are right and return 201', async function () {
   const response = await request(app)
        .post(url)
        .send({
            email:'validEmail@etest.com',
            password:'testPassword',
            name:"test name"
        })

    expect(response.statusCode).toEqual(201);
    expect(response.body.status).toEqual('success');

});

it('should return a 400 if email was in use or invalid with invalid email error code',async ()=>{
    const email = "test@test.com";
    const merchant = Merchant.build({
        email, name: "test", password: "test123456"
    })
    await merchant.save();

    const response = await request(app)
        .post(url)
        .send({
            email,
            name:'test',
            password:"sfdfdsfasdfasdf"
        })

    expect(response.statusCode).toEqual(400);
    expect(response.body.errorCode).toEqual(ErrorCodes.invalidEmail);


})

it('should return a badRequest error with code 400 if the password was less than 10 chachaters', async function () {
    const invalidPassword ='1234'
    const response= await request(app)
        .post(url)
        .send({
            email:'test@test.com',
            name:"jerry mahmoud",
            password:invalidPassword
        })

    expect(response.statusCode).toEqual(400)
    expect(response.body.errorCode).toEqual(ErrorCodes.badRequest);
});

it('should return 400 status code and invalid username error code if the user name contain anything not a character ',async function () {
    const invalidUserName ='jerry 123'
    const response= await request(app)
        .post(url)
        .send({
            email:'test@test.com',
            name:invalidUserName,
            password:"test1234553"
        })

    expect(response.statusCode).toEqual(400)
    expect(response.body.errorCode).toEqual(ErrorCodes.invalidUserName);
});

it('should creates a new merchant in database in case of 201 ', async function () {
    let merchants = await Merchant.find({}); // making sure the database id empty now
    expect(merchants.length).toEqual(0);

    await request(app)
        .post(url)
        .send({
            email:"test@test.com",
            name:"jerry mahmoud",
            password:"123455665sdasf"
        }).expect(201)

     merchants = await Merchant.find({});
    expect(merchants.length).toEqual(1);
    expect(merchants[0].email).toEqual("test@test.com")


});

it('should should publish an event of merchant created ', async function () {
    await request(app)
        .post(url)
        .send({
            email:"test@test.com",
            name:"jerry mahmoud",
            password:"123455665sdasf"
        }).expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

});

