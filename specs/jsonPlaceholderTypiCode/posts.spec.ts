import * as supertest from "supertest";

const request = supertest('https://jsonplaceholder.typicode.com')

describe('POSTS', () => {
    it('Get request for posts', async () => {
        const res = await request.get('/posts')
        console.log(res.body[0], 'First element posts')
        console.log(res.statusCode, 'Status code')
        console.log(res.body[5].id, 'ID')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].id).toBe(1)
    });
    it('Post request for posts', async () => {
        const data = {
            title: "My first post request for posts",
            body: "This is first body post request for posts",
            userId: 155
        }
        const res = await request.post('/posts').send(data)
        console.log(res.body.userId, 'userId')
        console.log(res.statusCode, 'Status Code')
        expect(res.statusCode).toEqual(201)
        expect(res.body.userId).toBe(155)
        expect(res.body.title).toEqual('My first post request for posts')
    })
    it('Patch request for posts', async () => {
        const data = {
            title: 'PATCH THIS TITLE',
            newAdd: 'I added this new line'
        }
        const resBeforePatch = await request.get('/posts/1')
        console.log(resBeforePatch.body, '======= Response body before Patch =======')
        const resAfterPatch = await request.patch('/posts/1').send(data)
        console.log(resAfterPatch.body, '====== Response body after Patch ======')

        expect(resAfterPatch.statusCode).toEqual(200)
        expect(resAfterPatch.body.newAdd).toEqual(data.newAdd)
        expect(resAfterPatch.body.title).toEqual(data.title)
        expect(resAfterPatch.body).not.toEqual(resBeforePatch.body)
    });
    it('Delete request for posts', async () => {

    });
});