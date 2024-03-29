const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	)
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.nxeta.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: process.argv[3],
	number: process.argv[4],
})

if (process.argv[3] && process.argv[4]) {
	person.save().then(() => {
		console.log(`Added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})
} else {
	Person.find({}).then((res) => {
		res.forEach((person) =>
			console.log(`${person.name} ${person.number} ${person._id}`)
		)
		mongoose.connection.close()
	})
}
