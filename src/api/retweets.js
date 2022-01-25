import { options } from './config'

const retweet = async (userId, tweetId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/retweets`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      userId,
      tweetId
    })
  })

  const data = await response.json()
  return data
}

export {
   retweet
}