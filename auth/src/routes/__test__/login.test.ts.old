import {User} from "../../models/user";
import request from "supertest";
import {app} from "../../app";
import jwt from "jsonwebtoken";

const url  = '/api/users/login'
const setup = async ()=>{
    const email = "test@test.com";
    const name = "jerry"
    const password= "strongPassword"
    const user  =  User.build({email,name,password})
    await user.save()
    return {user,password}
}


interface Payload{
    sessionId:string,
    isEmailVerified:boolean,
    id:string;
    role:string;
    email:string
    verifiedMerchant:boolean;
    exp:number,
    iat:number
}
it('should return 400 if you did not provide rememberMe field  ', async function () {
    const  {user,password} = await setup();
    await request(app)
        .post(url)
        .send({
            email:user.email,
            password, // we are not using user.password because the password is hashed
        }).expect(400)
});

it('should return 401 if the email or  was not right ', async function () {
    const {user,password} = await setup(); // creates a user in the database
    await  request(app)
        .post(url)
        .send({
            email: "anyemail@test.com",
            password:"anypassword",
            rememberMe:true
        })
        .expect(401)
});

it('should return 401 if password was not right  ', async function () {
    const {user,password} = await  setup();
    await  request(app)
        .post(url)
        .send({
            email: user.email,
            password:"anypassword",
            rememberMe:true
        })
        .expect(401)



});

it('should return 200 if email and password were right',async function () {
    const {user,password} = await  setup();
    await  request(app)
        .post(url)
        .send({
            email: user.email,
            password:password, // not using user.password because it is hashed
            rememberMe:true
        })
        .expect(200)
});

it('should sets login session of the user ',async function () {
    const {user,password} = await  setup()
    await request(app)
        .post(url)
        .send({
            email:user.email,
            password,
            rememberMe:true
        }).expect(200)
    const sameUser = await User.findById(user.id);
    expect(sameUser!.loginSession[0]).toBeDefined();
});

it('should sets a cookie for the access token in case of success', async function () {
    const {user,password} = await  setup()
    const response= await request(app)
        .post(url)
        .send({
            email:user.email,
            password,
            rememberMe:true
        }).expect(200)
    expect(response.get('Set-Cookie')).toBeDefined();
});

it('should send access and refresh token in case of success', async function () {
    const {user,password} = await  setup()
    const response= await request(app)
        .post(url)
        .send({
            email:user.email,
            password,
            rememberMe:true
        }).expect(200)
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.refreshToken).toBeDefined();
});

it('should set a refresh token valid for 7 days if rememberMe was set to true ', async function () {

    const {user,password} = await  setup()
    const response= await request(app)
        .post(url)
        .send({
            email:user.email,
            password,
            rememberMe:true
        }).expect(200)

    const refreshToken = response.body.data.refreshToken;
    const payload   = (jwt.decode(refreshToken) ) as Payload
    const expiryDate = new Date(payload.exp *1000); //because they are the ones who /1000 in the first place
    const date = new Date(Date.now()+ 1000*60*60*24*6    +   1000*60*60*23) //6day and 24 hours
    // to see if expiry date is less than 7 days

    console.log(date)
   if (expiryDate< date){
        throw new Error('expiresDate expires before 7 days ')
    }


});