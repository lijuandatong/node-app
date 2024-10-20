// getCustomer(1)
//     .then(user => {
//         console.log('user', user)
//         if(user.isGlod){
//             return getTopMovies().then(movies => ({user, movies}))
//         }else{
//             return null
//         }
//     })
//     .then(({user, movies}) => sendEmail(user.email, movies))
//     .then(() => console.log('send email'))
//     .catch(error => console.log('error', error.message))

async function notifyCustomer(){
    const user = await getCustomer(1)
    console.log('user', user)
    if(user.isGlod){
        const movies = await getTopMovies()
        await sendEmail(user.email, movies)
        console.log('send email')
    }
}

notifyCustomer()

function getCustomer(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id:id, name:'lijuan', isGlod:true, email:'lijuandatong@gamil.com'})
        }, 2000);
    })
}

function getTopMovies(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('getting top movies')
            resolve(['movie1', 'movie2'])
        }, 2000);
    })
}

function sendEmail(email, movies){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`send ${email} movies ${movies}`)
            resolve()
        }, 2000);
    })
}