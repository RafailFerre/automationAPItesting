import * as supertest from "supertest";
import { user } from "../../data/user";

const request = supertest('http://localhost:8001/api/v1')
describe('USER SIGN UP', () => {
    it('Sign up with valid credentials', async () => {
        const res = await request
            .post('/users/signup')
            .send(user)
            //     {
            //     "name": "Irina7",
            //     "email": "irina7@gmail.com",
            //     "password": "12345678",
            //     "passwordConfirm": "12345678"
            // }
            .expect(201)
        console.log(res.body, '=====Response body=====')
        expect(res.body.data.user.name).toBe(user.name)
        expect(res.body.data.user.email).toBe(user.email)
        expect(res.body.token).toBeDefined()
        expect(typeof res.body.token).toBe('string')
    });
});