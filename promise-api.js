// const p = Promise.resolve('1')
// p.then(result => console.log(result))

const p = Promise.reject(new Error('rejection'))
p.then(error => console.log(error.message))