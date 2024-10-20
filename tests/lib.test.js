const lib = require('../lib')
const db = require('../db')

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
})

describe('greet', () => {
    it('shoule return the greeting message', () => {
        const result = lib.greet('Lijuan')
        expect(result).toMatch(/Lijuan/)
        expect(result).toContain('Lijuan')
    })
})

describe('getCurrencies', () => {
    it('should return the currencies', () => {
        const result = lib.getCurrencies()
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
    })
})

describe('getProduct', () => {
    it('should return the product', () => {
        const result = lib.getProduct(1)
        // expect(result).toBe({id: 1, price: 10})
        expect(result).toEqual({id: 1, price: 10})
        expect(result).toMatchObject({id: 1, price: 10})
        expect(result).toHaveProperty('id', 1)
    })
})

describe('registerUser', () => {
    it('should throw exception if username is falsy', () => {
        const args = [null, undefined, 0, '', NaN, false]
        args.forEach( a => {
            expect(() => {lib.registerUser(a)}).toThrow()
        })
    })
    it('should return register user if username is passed', () => {
        const result = lib.registerUser('Lijuan')
        expect(result).toMatchObject({username: 'Lijuan'})
        expect(result.id).toBeGreaterThan(0)
    })
})

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 pooints', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ customerId: 1, points: 20 })
        // db.getCustomerSync = function(customerId){
        //     console.log('fake reading customer')
        //     return { customerId: customerId, points: 20 }
        // }

        const order = {customerId: 1, totalPrice: 10}
        lib.applyDiscount(order)
        console.log('order', order)
        expect(order.totalPrice).toBe(9)
    })
})