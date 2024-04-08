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
    it('Put request for posts', async () => {
        const data = {
            title: 'New TITLE for put request',
            newBody: 'FULLY NEW BODY after PUT REQUEST'
        }
        const resBeforePut = await request.get('/posts/1')
        console.log(resBeforePut.body, '********** RESPONSE beforePut *********')
        const resAfterPut = await request.put('/posts/1').send(data)
        console.log(resAfterPut.body, '+++++++++++++++++ RESPONSE after put ++++++++++++++++')

        expect(resAfterPut.statusCode).toEqual(200)
        expect(resAfterPut.body.newBody).toEqual(data.newBody)
        expect(resAfterPut.body.title).toEqual(data.title)
        expect(resAfterPut.body).not.toEqual(resBeforePut.body)
    });
    it('Delete request for posts', async () => {
        const res = await request.delete('/posts/1')
        console.log(res.body, '======Response body======')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({})
    });
    it('Patch request for posts VERSION 2', async () => {
        const data = {
            title: 'NEW TITLE AFTER PATCH VERSION 2'
        }
        const resBeforePatch = await request.get('/posts/1')
        await request.patch('/posts/1')
            .send(data)
            .then((response) => {
            console.log(response.body, '-----------------RESPONSE v2----------------')
            expect(response.statusCode).toEqual(200)
            expect(response.body.title).toEqual(data.title)
            expect(response.body.title).not.toEqual(resBeforePatch.body.title)
        })
    });
    it.only('Patch request for posts VERSION 3', (done) => {
        const data = {
            title: 'NEW TITLE AFTER PATCH VERSION 3'
        }
        let titleBeforePatch = null;
        request
            .get('posts/1')
            .end((err, res) => {
                if(err) return done(err)
                titleBeforePatch = res.body.title
                console.log(titleBeforePatch, '------ Title BEFORE PATCH --------')
            });
        request
            .patch('/posts/1')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)
                console.log(titleBeforePatch, '------ Title BEFORE PATCH --------')
                console.log(res.body, '-----------------RESPONSE VERSION 3----------------')
                expect(res.statusCode).toEqual(200)
                expect(res.body.title).toEqual(data.title)
                expect(res.body.title).not.toBe(titleBeforePatch)
                done()
            });
    });
});