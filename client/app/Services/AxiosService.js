import { baseURL } from '../env.js'

// @ts-ignore
// eslint-disable-next-line no-undef
export const api = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  withCredentials: true
})

// eslint-disable-next-line no-undef
export const footballApi = axios.create({
  baseURL: 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json',
  timeout: 8000
})
