import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
//const baseUrl = 'https://3001-dennisahlqv-moocfullsta-d5m513kuso4.ws-eu54.gitpod.io/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
         axios.delete(`${baseUrl}/${id}`);
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update , 
  remove: remove 
}