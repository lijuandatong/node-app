const express = require('express')
const router = express.Router()

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.post('/', (req, res) => {
    // validate course
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

router.put('/:id', (req, res) => {
    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given id does not exist')

    // validate course name
    console.log(req.body.name)
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // update course
    course.name = req.body.name
    console.log(req.body.name)
    res.send(course)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given id does not exist')
    res.send(course)
})

router.delete('/:id', (req, res) => {
    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given id does not exist')

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(course, schema)
    return result
}

module.exports = router