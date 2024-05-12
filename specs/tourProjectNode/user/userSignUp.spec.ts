import * as supertest from "supertest";
import { user } from "../../data/user";

const request = supertest('http://localhost:8001/api/v1')


describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING', () => {
        it('Sign up with valid credentials', async () => {
            const res = await request.post('/users/signup').send(user)
                //     {
                //     "name": "Irina7",
                //     "email": "irina7@gmail.com",
                //     "password": "12345678",
                //     "passwordConfirm": "12345678"
                // }
                .expect(201)
            console.log(res.body, '=====Response body=====')
            expect(res.statusCode).toEqual(201)
            expect(res.body.data.user.name).toBe(user.name)
            expect(res.body.data.user.email).toBe(user.email)
            expect(res.body.token).toBeDefined()
            expect(typeof res.body.token).toBe('string')
        });
    });
    describe('NEGATIVE TESTING', () => {
        it('Should not sign up new user with the same email', async () => {
            const res1 = await request.post('/users/signup').send(user).expect(201)
            console.log(res1.body, '***** Response body 1 *****')
            const res2 = await request.post('/users/signup').send(user)//.then(response => {
            console.log(user.email, '=========== email ==========')
            console.log(res2.body, '--------- Response body 2 ---------')
            expect(res2.statusCode).toEqual(500)
            expect(res2.body.message).toBe(`E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`)
            expect(res2.body.status).toBe('error')
            //})
        });
        it('Should not sign up new user without name', async () => {
            const res = await request.post('/users/signup').send(
                {
                    email: user.email,
                    password: user.password,
                    passwordConfirm: user.password
                }
            )
            console.log(res.body, '############ Response body ############')
            expect(res.statusCode).toEqual(500)
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: name: Please tell us your name!')
        });
        it('Should not sign up new user without email', async () => {
            const res = await request.post('/users/signup').send(
                {
                    name: user.name,
                    password: user.password,
                    passwordConfirm: user.password
                }
            )
            console.log(res.body, '------------------ Response body ----------------------')
            expect(res.statusCode).toEqual(500)
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: email: Please provide your email')
        });
        it('Should not sign up new user without password', async () => {
            const res = await request.post('/users/signup').send(
                {
                    name: user.name,
                    email: user.email,
                    passwordConfirm: user.password
                }
            )
            console.log(res.body, '------------------ Response body ----------------------')
            expect(res.statusCode).toEqual(500)
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!')
        });
        it('Should not sign up new user without passwordConfirm', async () => {
            const res = await request.post('/users/signup').send(
                {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            )
            console.log(res.body, '------------------ Response body ----------------------')
            expect(res.statusCode).toEqual(500)
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: passwordConfirm: Please confirm your password')
        });
    })
});