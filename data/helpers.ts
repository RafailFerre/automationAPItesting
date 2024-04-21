import * as supertest from "supertest";
import { user } from "./user";

const request = supertest('localhost:8001/api/v1')

export async function deleteUser(response: { headers: { [x: string]: any } }) {
    return request
        .delete('/users/deleteMe')
        .set('Cookie', response.headers['set-cookie'])
}

export async function loginUser(user: { email: string; password: string; }) {
    return request
        .post('/users/login')
        .send({ email: user.email, password: user.password })
}

export async function signUpUser(user: string | object) {
    return request
        .post('/users/signup')
        .send(user)
}