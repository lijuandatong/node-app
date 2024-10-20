const lib = require('../testexercise')

describe('fizzbuzz', () => {
    it('shoule throw an exception if input is not a number', () => {
        expect(() => {
            lib.fizzBuzz('Lijuan')
        }).toThrow()
    })
    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })
    it('should return Fizz if input is divisible by 3', () => {
        const result = lib.fizzBuzz(9)
        expect(result).toBe('Fizz')
    })
    it('should return Buzz if input is divisible by 5', () => {
        const result = lib.fizzBuzz(10)
        expect(result).toBe('Buzz')
    })
    it('should return input if it is not divisible by 3 or 5', () => {
        const result = lib.fizzBuzz(4)
        expect(result).toBe(4)
    })
})