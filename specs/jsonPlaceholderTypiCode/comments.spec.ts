import * as supertest from 'supertest'

const request = supertest('https://jsonplaceholder.typicode.com')

describe('COMMENTS', () => {
    it('Get request for comments', async () => {
        const res = await request.get('/comments')
        console.log(res.body[0], 'First element comments')
        console.log(res.statusCode, 'Status code')
        console.log(res.body[5].id, 'ID')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].id).toBe(1)
    });
    it('Post request for comments', async () => {
        const data = {
            title: 'My first post request for comments',
            chto_to: 'Chto-to tut takoe',
        }
        const res = await request.post('/comments').send(data)
        console.log(res.body.chto_to, 'FROM RESPONSE')
        console.log(res.statusCode, 'Status code')
        expect(res.statusCode).toEqual(201)
        expect(res.body.chto_to).toEqual('Chto-to tut takoe')
        expect(res.body.title).toEqual('My first post request for comments')
    })
});