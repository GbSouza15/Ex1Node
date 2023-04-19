const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())


const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))

function logMethod(request, response, next) {
    console.log(request.method)
    next()
}

const met = [logMethod]

app.get('/api/persons/info', met, (request, response) => {
    response.send('User Info')
})

let list = [
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


// Método Get -----------------------------------------------------------------------
app.get('/api/persons', (request, response) => {
    response.json(list)
})

app.get('/info', (request, response) => {
    const personsInList = list.length
    const data = new Date()
    response.send(`
        <p>Persons in list: ${personsInList}</p>
        <p>${data}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = list.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
//--------------------------------------------------------------------------------------

// Método Delete -----------------------------------------------------------------------

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    list = list.filter(list => list.id !== id)

    response.status(204).end()
})
//-----------------------------------------------------------------------------------

function generateId() {
    const maxId = list.length > 0 ? Math.max(...list.map(n => n.id)) : 0
    return maxId + 1
}

// Método Post -----------------------------------------------------------------------

app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
  }
  list = list.concat(person)
  response.json(person)
})

//-------------------------------------------------------------------------------------

const port = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
})