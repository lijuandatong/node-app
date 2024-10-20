const request = require('supertest')
const { Genre } = require('../.././models/genre')
const { User } = require('../.././models/user')
let server // 不在这里赋值，因为如果开启了自动运行，rerun的时候会去重新监听4000端口，导致报错

describe('/api/genres', () => {
    beforeEach( () => {server = require('../../index')} )
    afterEach( async() => { 
        server.close() 
        await Genre.remove()
    })
    
    describe('GET /', () => {
        it('should return all genres', async() => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return 404 if invalid id is passed', async() => {
            const res = await request(server).get('/api/genres/1')
            expect(res.status).toBe(404)
        })

        it('should return a genre if valid id is passed', async() => {
            const genre = new Genre({ name: 'genre1' })
            await genre.save()

            const res = await request(server).get(`/api/genres/${genre._id}`)
            expect(res.status).toBe(200)
            // expect(res.body).toMatchObject(genre)
            expect(res.body).toHaveProperty('name', genre.name)
        })
    })

    describe('POST /', () => {
        let token
        let name

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name })
        }

        beforeEach( () => {
            token = new User().generateAuthToken()
            name = 'genre1'
        })

        it('should return 401 if user did not log in', async() => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })
        it('should return 400 if genre is less than 5 characters', async() => {
            name = 'gene'
            const res = await exec()
            expect(res.status).toBe(400)
        })
        it('should return 400 if genre is more than 25 characters', async() => {
            name = new Array(27).join('a')
            const res = await exec()
            expect(res.status).toBe(400)
        })
        it('should save a genre if it is valid', async() => {
            await exec()

            const genre = await Genre.find({ name: 'genre1'} )
            expect(genre).not.toBeNull()
        })
        it('should return a genre if it is valid', async() => {
            const res = await exec()

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
})