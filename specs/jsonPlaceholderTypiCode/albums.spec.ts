import * as supertest from "supertest";

const request = supertest('https://jsonplaceholder.typicode.com')

describe('ALBUMS', () => {
    it('Get request for albums', async () => {
        const res = await request.get('/albums')
        console.log(res.body[0], 'First element comments')
        console.log(res.statusCode, 'Status code')
        console.log(res.body[0].id, 'ID')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].id).toBe(1)
    });
    it('Post request for albums', async () => {
        const data = {
            title: 'My first post request for albums',
            album: 'Vot nazvanie album'
        }
        const res = await request.post('/albums').send(data)
        console.log(res.body.title, 'TITLE')
        console.log(res.statusCode, 'Status code')
        console.log(res.body.album, 'Name ALBUM')
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual('My first post request for albums')
        expect(res.body.album).toEqual('Vot nazvanie album')
    })
});