import axios from 'axios'
import { env } from 'process'

export const apiPathKeys = {
  root: '/',
}

export const baseClient = axios.create({
  baseURL: env.BACK_SERVER_URL,
})

export const baseBffClient = axios.create({
  baseURL: env.BFF_BASE_USER_PREFIX,
})
