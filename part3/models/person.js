const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connecting to', url)

mongoose
	.connect(url)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: (value) => {
				return (
					/^[0-9]{2}-[0-9]{6,}/.test(value) ||
					/^[0-9]{3}-[0-9]{5,}/.test(value) ||
					/^[0-9]{8,}/.test(value)
				)
			},
			message: ({ value }) => `${value} is not a valid number`,
		},
		required: true,
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Person', personSchema)
