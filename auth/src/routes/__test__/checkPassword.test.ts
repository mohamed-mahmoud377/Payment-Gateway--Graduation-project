import request from "supertest";
import {app} from "../../app";

it('should return 200 if the password is more than 10 charter ',async function () {
        await request(app)
            .post('/api/users/check-password')
            .send({
                password:"12345667456345"
            })
            .expect(200)
});

it('should return 400 if password is less than 10 charter ',async function () {
    await request(app)
        .post('/api/users/check-password')
        .send({
            password:"          sa123        "
        })
        .expect(400)
});