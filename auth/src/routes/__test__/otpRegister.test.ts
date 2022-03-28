import request from "supertest";
import {app} from "../../app";
import {User} from "../../models/user";

const url = '/api/users/otp-registration'

const setup =async (expriesAtMilie:number)=>{
    const otp = 12345
  const user = User.build({email:"test@test.com",password:"strongPassword",name:"jerry"})
    user.otpNumber = otp;
    user.otpExpiryDate= new Date(expriesAtMilie)
    await user.save();
    return {otp,user}
}

it('should return a 400 error if the otp or userId is not provided ',async function () {
    await request(app)
        .post(url)
        .send()
        .expect(400)

});

it('should return 400 if the user id is not a valid Id', async function () {
    await request(app)
        .post(url)
        .send({
            otp:3242,
            userId:'invalidMongoID'
        }).expect(400)
});

it('should return 400 if the otp password is wrong', async function () {
    const {user,otp } = await setup(Date.now()+10*60*1000);
    await request(app)
        .post(url)
        .send({
            userId:user.id,
            otp:12321              // wrong otp number
        }).expect(400)
});

it('should return 400 if the otp number expires', async function () {
    const {user,otp} = await  setup(Date.now()+1) // this will expire within 1 mile sec
    await request(app)
        .post(url)
        .send({
            userId:user.id,
            otp               // note that this the right userId and the right otp number
        }).expect(400)
});

it('should return 200 if the otp number is right and it did not expire', async function () {
    const {user,otp} = await  setup(Date.now()+60*1000*10) // this will expire within 10 min
    await request(app)
        .post(url)
        .send({
            userId:user.id,
            otp               // note that this the right userId and the right otp number
        }).expect(200)

});

it('should return the access refresh token with everything is right ',async function () {
    const {user,otp} = await  setup(Date.now()+60*1000*10) // this will expire within 10 min
    const response = await request(app)
        .post(url)
        .send({
            userId:user.id,
            otp               // note that this the right userId and the right otp number
        }).expect(200)
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.refreshToken).toBeDefined();

});

it('should sets a cookie after successful valid data  with the access token ', async function () { // read this
    const {user,otp} = await  setup(Date.now()+60*1000*10) // this will expire within 10 min
    const response = await request(app)
        .post(url)
        .send({
            userId:user.id,
            otp               // note that this the right userId and the right otp number
        }).expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
});
