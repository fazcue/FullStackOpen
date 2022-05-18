import React from 'react'

const Contact = ({ name, number, id, deletePerson }) => {
	return (
		<p>
			{name} {number} <button onClick={() => deletePerson(id, name)}>delete</button>
		</p>
	)
}

export default Contact
