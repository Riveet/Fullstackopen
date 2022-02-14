import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const createNew = async (blogId, content) => {
  console.log(blogId, content)
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, content)
  return response.data
}

export default { getAll, createNew }
