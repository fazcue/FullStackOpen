import React from 'react'
import Contact from './Contact'

const ContactsList = ({ contacts, deletePerson }) => {
	const contactList = contacts.map((person) => (
		<Contact
			name={person.name}
			number={person.number}
			id={person.id}
			deletePerson={deletePerson}
			key={person.id}
		/>
	))

	return (
		<>
			<h2>Numbers</h2>
			{contacts.length > 0 ? contactList : 'no contacts found.'}
		</>
	)
}

export default ContactsList
