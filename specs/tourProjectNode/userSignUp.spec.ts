import * as supertest from "supertest";

const request = supertest('http://localhost:8001/api/v1')
describe('USER SIGN UP', () => {
    it('Sign up with valid credentials', async () => {
        const res = await request
            .post('/users/signup')
            .send({
                "name": "Irina Kameneva4",
                "email": "irina4@gmail.com",
                "password": "12345678",
                "passwordConfirm": "12345678"
            })
            .expect(201)
    });
});