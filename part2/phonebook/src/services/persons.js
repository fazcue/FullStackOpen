import axios from 'axios'

const PERSONS_API_URL = process.env.REACT_APP_PERSONS_API_URL

const getAll = () => {
	return axios.get(`${PERSONS_API_URL}/persons`)
}

const create = (newObject) => {
    return axios.post(`${PERSONS_API_URL}/persons`, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${PERSONS_API_URL}/persons/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${PERSONS_API_URL}/persons/${id}`)
}

const personService = { getAll, create, update, remove }

export default personService
