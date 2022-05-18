import React from 'react'

const NewContactForm = ({
	addNewPerson,
	newName,
	handleNewName,
	newNumber,
	handleNewNumber,
}) => {
	return (
		<>
			<h2>add a new contact</h2>
			<form onSubmit={addNewPerson}>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					number:	<input value={newNumber} onChange={handleNewNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	)
}

export default NewContactForm
