const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB'))
    .catch(err => console.error('could not connet to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    try{
        const course = new Course({
            // name: 'angular course',
            author: 'Mosh',
            tags: ['angular', 'frontend'],
            isPublished: true
        })
        const result = await course.save()
        console.log(result)
    }catch(error){
        console.log('error', error.message)
    }
}

async function getCourses(){
    console.log('getCourses')
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1})
    console.log('courses', courses)
}

createCourse()