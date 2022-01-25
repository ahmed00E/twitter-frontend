import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import { LeftContainer } from '../components/Containers/Containers'
import { UserContext } from '../contexts/User'
import Main from '../layouts/Main'
import PageHeader from '../components/Headers/PageHeader'
import { TweetContent, Username, Usertag } from '../styles/typography'
import User from '../components/User'
import Modal from '../components/Modal'
import { borderColor, blue, green, grey } from '../styles/colors'
import { Chat, ArrowRepeat } from 'react-bootstrap-icons'
import CommentForm from '../components/Forms/Comment'

import { getTweet } from '../api/tweets'
import { retweet } from '../api/retweets'
import Box from '../components/Containers/Box'
import { ModalContext } from '../contexts/Modal'

const Inner = styled.div`
  padding: 16px;
`

const RetweetsBanner = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: solid 1px ${borderColor};
  border-bottom: solid 1px ${borderColor};
  cursor: pointer;
`

const Footer = styled.div`
  padding-bottom: 16px;
  display: flex;
  justify-content: space-around;
`

const Action = styled.div`
  display: flex;
  gap 8px;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${props => props.color};
    
    .chat {
      fill: ${blue};
    }

    .retweet {
      fill: ${green};
    }
  }
`

const Comment = styled.div`
  padding: 0px 16px;
`

const Tweet = () => {
  const { _id } = useParams()
  const { user } = useContext(UserContext)
  const { setCommentTweetId } = useContext(ModalContext)
  const [tweet, setTweet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [retweetsOpened, setRetweetsOpened] = useState(false)

  useEffect(() => {
    setCommentTweetId(_id)
    fetchTweet()
    // eslint-disable-next-line
  }, [])

  const fetchTweet = async () => {
    const tweet = await getTweet(_id)
    setTweet(tweet)
    setLoading(false)
  }

  const handleRetweetClick = async () => {
    if (user) {
      await retweet(user._id, _id)
      await fetchTweet()
    }
  }

  return (
    <Main
      loading={loading}
      header={<PageHeader title="Tweet" />}
    >
      {tweet &&
        <LeftContainer>
          <User
            username={tweet.author.username}
            usertag={tweet.author.usertag}
            _id={tweet.author._id}
            noBottomBorder
          />
          <Inner>
            <TweetContent>{tweet.content}</TweetContent>
          </Inner>
          <Inner>
            <Usertag>
              {`${moment(tweet.createdAt).format('HH:mm')} · ${moment(tweet.createdAt).format('MMM DD, YYYY')}`} 
            </Usertag>
            {tweet.retweets.length > 0 &&
              <RetweetsBanner>
                <span onClick={() => setRetweetsOpened(true)}>
                  <strong>{tweet.retweets.length}</strong> retweets
                </span>
                <Modal
                  opened={retweetsOpened}
                  onHide={() => setRetweetsOpened(false)}
                >
                  {tweet.retweets.map(user => (
                    <User
                      key={user.createdAt}
                      username={user.username}
                      usertag={user.usertag}
                      _id={user._id}
                      followCallback={fetchTweet}
                    />
                  ))}
                </Modal>
              </RetweetsBanner>
            }
          </Inner>
          <Footer>
            <Action color={blue}>
              <Chat className='chat' color={grey} />
              {tweet.comments.length}
            </Action>
            <Action
              color={green}
              onClick={handleRetweetClick}
            >
              <ArrowRepeat size={20} className='retweet' color={grey} />
            </Action>
          </Footer>
          {user &&
            <CommentForm
              callback={fetchTweet}
            />
          }
          {tweet.comments.map(comment => (
            <Box>
              <Comment>
                <Username>{comment.author.username}</Username>
                <Usertag>{comment.author.usertag}</Usertag>
                <p>{comment.content}</p>
              </Comment>
            </Box>
          ))}
        </LeftContainer>
      }
    </Main>
  )
}

export default Tweet