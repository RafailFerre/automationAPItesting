import * as supertest from "supertest";
import {user} from "../../data/user";
import {signUpUser, loginUser, deleteUser} from "../../data/helpers";

const request = supertest('http://localhost:8001/api/v1')
describe('USER SIGNUP AND LOGIN', () => {
    describe('POSITIVE TESTING', () => {
        it('Login user with valid credentials', async () => {
            // const res = await request
            //     .post('/users/signup')
            //     .send(user)
            //     .expect(201)
            const res = await signUpUser(user)//.then(res => {
            console.log(user, '*-*-*-*-*-*-*-*-* USER *-*-*-*-*-*-*-*')
            console.log(res.body, '********** Response body **********')
            console.log(res.header, '-------- HEADER -----------')
            expect(res.statusCode).toEqual(201)
            expect(res.body.data.user.name).toEqual(user.name)
            expect(res.body.data.user.email).toEqual(user.email)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            //})
            const resLogin = await loginUser(user)
                // .post('/users/login')
                // .send({
                //         email: user.email,
                //         password: user.password
                //     }
                // )
                // .expect(200)
            console.log(resLogin.body, '------------ Response Login -------------')
            expect(resLogin.statusCode).toEqual(200)
            expect(resLogin.body.status).toEqual('success')
            expect(resLogin.body.data.user.name).toEqual(user.name)
            expect(resLogin.body.data.user.email).toEqual(user.email)
            expect(resLogin.body.token).toBeDefined()
            expect(resLogin.header['content-type']).toEqual('application/json; charset=utf-8')

            await deleteUser(resLogin).then(res => {
                console.log(res.body, '//////// Response after delete /////////')
                expect(204)
            })

            await loginUser(user).then(res => {
                console.log(res.body, '++++++++ Response login after delete')
                expect(401)
                expect(res.body.message).toEqual('Incorrect email or password')
            })
        });
    });
    describe('NEGATIVE TESTING', () => {
        it('Should not login with invalid password', async () => {
            const resLogin = await request
                .post('/users/login')
                .send({
                        email: user.email,
                        password: '1234567890'
                    }
                )
                .expect(401)
            console.log(resLogin.body, '------------ Response with incorrect password -------------')
            console.log(resLogin.header, '-------- HEADER -----------')
            expect(resLogin.statusCode).toEqual(401)
            expect(resLogin.body.status).toEqual('fail')
            expect(resLogin.body.message).toEqual('Incorrect email or password')
            expect(resLogin.body.token).not.toBeDefined()
            expect(resLogin.header['content-type']).toEqual('application/json; charset=utf-8')

        });
        it('Should not login with invalid email', async () => {
            await request
                .post('/users/login')
                .send({
                    email: 'fake@mail.com',
                    password: user.password
                })
                .expect(401)
                .then(res => {
                    console.log(res.body, '+++++++ Response with incorrect email +++++++')
                    console.log(res.header, '-------- HEADER -----------')
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.status).toEqual('fail')
                    expect(res.body.message).toEqual('Incorrect email or password')
                    expect(res.body.token).not.toBeDefined()
                    expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

                })
        });
    });
});