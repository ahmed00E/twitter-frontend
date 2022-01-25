import { options } from './config'

const getUser = async username => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, {
    ...options
  })

  const data = await response.json()
  return data
}

const editUser = async ({ username, bio, location, website, userId }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
    method: 'put',
    ...options,
    body: JSON.stringify({
      username,
      bio,
      location,
      website
    })
  })

  const data = await response.json()
  return data 
}

const getUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    ...options
  })

  const data = await response.json()
  return data
}

const follow = async ({ profileId }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/follow`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      profileId
    })
  })

  const data = await response.json()
  return data
}

export {
  getUser,
  editUser,
  getUsers,
  follow
}