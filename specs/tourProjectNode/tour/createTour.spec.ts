import * as supertest from "supertest";
import { user } from "../../../data/user";
import { deleteUser, loginUser, signUpUser } from "../../../data/helpers";

const request = supertest("localhost:8000/api/v1")

describe('CREATE TOUR', () => {
    describe('POSITIVE TESTING', () => {
        it('User can create tour with valid credentials', async () => {
            await signUpUser(user).then(res => {
                expect(res.statusCode).toEqual(201)
                expect(res.body.data.user.email).toBe(user.email)
            })
        });
    });
    describe('NEGATIVE TESTING', () => {
        it('User can not create tour with invalid credentials', () => {

        });
    });
});