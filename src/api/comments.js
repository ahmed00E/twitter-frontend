import { options } from './config'

const postComment = async ({ content, author, tweet }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
    method: 'post',
    ...options,
    body: JSON.stringify({
      author,
      tweet,
      content
    })
  })

  const data = await response.json()
  return data
}

export {
  postComment
}