import axios from 'axios'

let baseURL = ''

if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3333'
else if (process.env.NODE_ENV === 'production')
  baseURL = 'https://energy-calculator-api.herokuapp.com/'

console.log("ENVIRONMENT: " + process.env.NODE_ENV)

const api = axios.create({
  baseURL
})

export default api
