import { options } from './config'

const createTweet = async ({ content, author }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      content,
      author
    })
  })

  const data = await response.json()
  return data
}

const getFeed = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets/feed`, {
    ...options
  })

  const data = await response.json()
  return data
}

const getTweet = async _id => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets/${_id}`, {
    ...options
  })

  const data = await response.json()
  return data
}

export {
  createTweet,
  getFeed,
  getTweet
}