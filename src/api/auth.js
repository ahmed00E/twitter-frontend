import { options } from './config'

const logIn = async ({ username, password }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      username,
      password
    }),
  })

  if (response.status >= 400) {
    throw response.statusText
  }

  const data = await response.json()
  return data
}

const signUp = async ({ username, password, birthDate }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      username,
      password,
      birthDate
    })
  })

  const data = await response.json()
  return data
}

const getMe = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
    ...options
  })

  const data = response.json()
  return data
}

const logOut = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    method: 'delete',
    ...options
  })

  const data = response.json()
  return data
}

export {
  logIn,
  signUp,
  getMe,
  logOut
}
