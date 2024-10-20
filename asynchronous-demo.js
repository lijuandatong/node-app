console.log('before')

// getUser(1)
//    .then(user => getReporitories(user))
//    .then(repos => getCommits(repos[0]))
//    .then(commits => console.log('commits', commits))
//    .catch(error => console.log(error.message))

async function displayCommits(){
    try{
        const user = await getUser(1)
        const repos = await getReporitories(user)
        const commits = await getCommits(repos[0])
        console.log('commits', commits) // 好神奇，这里也是异步的
    }catch(error){
        console.log('error', error.message)
    }
}

displayCommits()

function getUser(id){
    return new Promise((resolve, reject) => {
        console.log('query database to get user')
        setTimeout(() => {
            resolve({id: id, name: 'lijuan'})
        }, 2000)
    })
}

console.log('after')

function getReporitories(username){
    console.log('requst api to get reporitories')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['repo1', 'repo2'])
        }, 2000)
    })
}

function getCommits(repo){
    console.log('requst api to get commits')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['commit1', 'commit2'])
        }, 2000)
    })
}