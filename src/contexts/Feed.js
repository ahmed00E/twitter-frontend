import { createContext, useState } from 'react'

import { getFeed } from '../api/tweets'

const FeedContext = createContext({ })

const FeedProvider = ({ children }) => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeed = async () => {
    const tweets = await getFeed()
    setTweets(tweets)
    setLoading(false)
  }

  const value = {
    tweets,
    setTweets,
    fetchFeed,
    loading,
    setLoading
  }

  return (
    <FeedContext.Provider value={value}>
      {children}
    </FeedContext.Provider>
  )
}

export {
  FeedContext,
  FeedProvider
}