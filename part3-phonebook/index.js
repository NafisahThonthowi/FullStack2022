const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())


let date = new Date()

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]

  const generateId = () => {
    
    return '_' + Math.random().toString(36).split(2,9)
  }

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    
    
  })

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for '+ persons.length +' people</p>' + date )
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(person => person.name)
    
    try {
        console.log(body.name)
        const name = JSON.parse(JSON.stringify(body.name));
        const number = JSON.parse(JSON.stringify(body.number));

      } catch (err) {
        return response.status(400).json({ 
            error: 'Name or number is missing' 
          })
      }
    
    if (names.includes(body.name)) {
        return response.status(400).json({ 
          error: 'The name already exists in the phonebook' 
        })
      }
    

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)