import { useEffect, useContext } from 'react'

import { LeftContainer } from '../components/Containers/Containers'
import Main from '../layouts/Main'
import Tweet from '../components/Tweet'
import TweetForm from '../components/Forms/Tweet'

import PageHeader from '../components/Headers/PageHeader'
import { FeedContext } from '../contexts/Feed'
import { UserContext } from '../contexts/User'

const Home = () => {
  const { user } = useContext(UserContext)
  const { tweets, fetchFeed, loading } = useContext(FeedContext)

  useEffect(() => {
    fetchFeed()
    // eslint-disable-next-line
  }, [])

  return (
    <Main
      loading={loading}
      header={<PageHeader title="Home" />}
    >
      <LeftContainer>
        {user &&
          <TweetForm noBorder />
        }
        {tweets.map(tweet => (
          <Tweet
            key={tweet.createdAt}
            content={tweet.content}
            username={tweet.author.username}
            usertag={tweet.author.usertag}
            createdAt={tweet.createdAt}
            comments={tweet.comments}
            retweets={tweet.retweets}
            _id={tweet._id}
            onRetweetClick={fetchFeed}
          />
        ))}
      </LeftContainer>
    </Main>
  )
}

export default Home