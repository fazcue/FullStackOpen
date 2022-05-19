import React, { useState, useEffect } from 'react'
import Notification from './components/Notificacion'
import NewContactForm from './components/NewContactForm'
import ContactsList from './components/ContactsList'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [searchName, setSearchName] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)

	const handleNewName = (event) => {
		setNewName(event.target.value)
	}

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchName = (event) => {
		setSearchName(event.target.value)
	}

	const handleNotification = (message, success) => {
		setNotificationMessage({message: message, success: success})
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}

	const handleError = (status, personName) => {
		let message = `Error ${status}. Please try again`

		if (status === 404) {
			message = `Error: ${personName} was previoulsy removed from your phonebook's database`
		}
		handleNotification(message, false)
	}

	const updateNumber = (id) => {
		const message = `${newName} is already added to phonebook. Do you want to replace de old number with a new one?`

		if (window.confirm(message)) {
			const newObject = { name: newName, number: newNumber }

			personService
				.update(id, newObject)
				.then(() =>
					setPersons((prev) => [
						...prev.map((person) => {
							if (person.id === id) { //update number
								return { ...person, number: newNumber }
							}
							return person
						}),
					])
				)
				.then(handleNotification(`Updated: ${newName}'s new number is ${newNumber}`, true))
				.catch(error => handleError(error.response.status, newName))
		}
	}

	const addNewPerson = (event) => {
		event.preventDefault()

		const isAlreadyAdded = persons.find(person => person.name === newName)

		//if the person name already exist, notify the user if update number, else save new person
		if (isAlreadyAdded) {
			updateNumber(isAlreadyAdded.id)
		} else {
			const newPerson = { name: newName, number: newNumber }

			personService
				.create(newPerson)
				.then((response) =>
					setPersons((prev) => [...prev, response.data])
				)
				.then(handleNotification(`Added: ${newName} is now in your phonebook`, true))
				.catch(error => handleError(error.response.status, newName))
		}

		setNewName('')
		setNewNumber('')
	}

	const deletePerson = (id, name) => {
		const message = `Delete ${name}?`

		if (window.confirm(message)) {
			personService
				.remove(id)
				.then(() =>
					setPersons((prev) => [
						...prev.filter((person) => person.id !== id),
					])
				)
				.then(handleNotification(`Removed: ${name} was deleted from your phonebook`, true))
				.catch(error => handleError(error.response.status, name))
		}
	}

	const filterContactsList = persons.filter((person) =>
		person.name.toLowerCase().includes(searchName.toLowerCase())
	)

	useEffect(() => {
		personService.getAll()
			.then((response) => setPersons(response.data))
	}, [])

	return (
		<div>
			<h1>Phonebook</h1>
			{notificationMessage && <Notification message={notificationMessage.message} success={notificationMessage.success} />}
			<SearchFilter
				searchName={searchName}
				handleSearchName={handleSearchName}
			/>
			<NewContactForm
				addNewPerson={addNewPerson}
				newName={newName}
				handleNewName={handleNewName}
				newNumber={newNumber}
				handleNewNumber={handleNewNumber}
			/>
			<ContactsList
				contacts={filterContactsList || persons}
				deletePerson={deletePerson}
			/>
		</div>
	)
}

export default App
