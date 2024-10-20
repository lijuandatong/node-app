const { Rental } = require('../../models/rental')
const mongoose = require('mongoose')

describe('api/returns', () => {
    let server
    let rental
    let customerId
    let movieId

    beforeEach( async () => {
        server = require('../../index')

        customerId = mongoose.Types.ObjectId()
        movieId = mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        })
        await rental.save()
    })
    afterEach( async () => {
        server.close() 
        await Rental.remove({})  // remove传的是过滤条件，没有条件，说明全部删除
    })

    it('should work', async () => {
        const result = await Rental.findById(rental._id)
        expect(result).not.toBeNull()
    })
}) 