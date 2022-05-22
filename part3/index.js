require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

//Morgan middleware
morgan.token('body', (req) => JSON.stringify(req.body))

const morganMiddleware = (tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
		tokens.body(req, res),
	].join(' ')
}

app.use(morgan(morganMiddleware))

//ROUTES
app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((persons) => {
			// persons.forEach(person => console.log(`${person.name} ${person.number} ${person._id}`))
			response.json(persons)
		})
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findById(id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.statusMessage = 'Person not found. Wrong id'
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const { body } = request

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((savedPerson) => response.json(savedPerson))
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const { body } = request

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(id, person, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((updatePerson) => {
			response.json(updatePerson)
		})
		.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	Person.findByIdAndDelete(id)
		.then(() => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.get('/info', (request, response) => {
	Person.countDocuments({}, (err, count) => {
		if (count) {
			response.send(`<p>Phonebook has info for ${count} people.</p>`)
		}
	})
})

//UNKNOWN ROUTES
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Error handler
const errorHandler = (error, request, response, next) => {
	console.log('ERROR MESSAGE', error)

	if (error.name === 'CastError') {
		response.statusMessage = 'Person not found. Malformatted id'
		return response.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

//LISTEN
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
