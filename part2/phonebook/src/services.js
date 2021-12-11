import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = await axios.get(url)
  return request.data
}

const create = async (newObj) => {
  const request = await axios.post(url, newObj)
  return request.data
}

const update = async (id, newObj) => {
  const request = await axios.put(`${url}/${id}`, newObj)
  return request.data
}

const deleteObj = async (id) => {
  const request = await axios.delete(`${url}/${id}`)
  return request
}

export default {
  getAll,
  create,
  update,
  deleteObj,
}
