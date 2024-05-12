import * as supertest from "supertest";
import {user} from "../../data/user";
import {signUpUser, loginUser, deleteUser} from "../../data/helpers";

const request = supertest('http://localhost:8001/api/v1')
describe('USER SIGNUP AND LOGIN', () => {
    describe('POSITIVE TESTING', () => {
        it('Login user with valid credentials and delete', async () => {
            let cookie: string;
            const res = await signUpUser(user)//.then(res => {
            console.log(user, '*-*-*-*-*-*-*-*-* USER *-*-*-*-*-*-*-*')
            console.log(res.body, '********** Response body **********')
            //console.log(res.header, '-------- HEADER -----------')
            expect(res.statusCode).toEqual(201)
            expect(res.body.data.user.name).toEqual(user.name)
            expect(res.body.data.user.email).toEqual(user.email)
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
            cookie = res.header['set-cookie']
            console.log(cookie, '++++++++++++++ COOOOKKKIIE-----++++++++--')
            //})

            await loginUser(user).then(res => {
                console.log(res.body, '------------ Response Login -------------')
                expect(res.statusCode).toEqual(200)
                expect(res.body.status).toEqual('success')
                expect(res.body.data.user.name).toEqual(user.name)
                expect(res.body.data.user.email).toEqual(user.email)
                expect(res.body.token).toBeDefined()
                expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
                cookie = res.header['set-cookie']
                console.log(cookie, '--------- COOOOKKKIIE-------')
            })

            await deleteUser(cookie).then(res => {
                console.log(res.body, '//////// Response after delete /////////')
                expect(204)
                expect(res.body).toEqual({})
            })

            await loginUser(user).then(res => {
                console.log(res.body, '++++++++ Response login after delete')
                expect(401)
                expect(res.body.message).toEqual('Incorrect email or password')
            })
        });
    });
    describe('NEGATIVE TESTING', () => {
        let cookie: string;
        beforeEach(async () => {
            await signUpUser(user).then(res => {
                //console.log(res.body.data.user.email, '--------------- signup email -------------------')
                expect(res.statusCode).toEqual(201)
                expect(res.body.data.user.role).toEqual('user')
                cookie = res.header['set-cookie']
            })
        })
        afterEach(async () => {
            await deleteUser(cookie).then(res => {
                //console.log(res.body, '//////// Response after delete /////////')
                expect(204)
                expect(res.body).toEqual({})
            })
        })
        it('Should not login with invalid password', async () => {
            const res = await loginUser({
                email: user.email,
                password: 'fake' + user.password
            })
            console.log(res.body, '------------ Response with incorrect password -------------')
            //console.log(resLogin.header, '-------- HEADER -----------')
            expect(res.statusCode).toBe(401)
            expect(res.body.status).toEqual('fail')
            expect(res.body.message).toEqual('Incorrect email or password')
            expect(res.body.token).not.toBeDefined()
            expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        });
        it('Should not login with invalid email', async () => {
            await loginUser({
                email: 'fake' + user.email,
                password: user.password
            })
                .then(res => {
                    console.log(res.body, '+++++++ Response with incorrect email +++++++')
                    //console.log(res.header, '-------- HEADER -----------')
                    expect(res.statusCode).toEqual(401)
                    expect(res.body.status).toEqual('fail')
                    expect(res.body.message).toEqual('Incorrect email or password')
                    expect(res.body.token).not.toBeDefined()
                    expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

                })
        });
    });
});