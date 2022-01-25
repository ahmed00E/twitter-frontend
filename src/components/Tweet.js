import { useContext } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import Box from './Containers/Box'
import { Username, Usertag, Date } from '../styles/typography' 
import { borderColor, grey, blue, green } from '../styles/colors'
import { formatDate } from '../helpers/moment'
import { Chat, ArrowRepeat } from 'react-bootstrap-icons'
import { UserContext } from '../contexts/User'
import { retweet } from '../api/retweets'
import { ModalContext } from '../contexts/Modal'

const Container = styled.div`
  border-top: solid 1px ${borderColor};
  width: 100%;

  &:nth-last-child(1) {
    border-bottom: solid 1px ${borderColor};
  }
`

const Inner = styled.div`
  padding-top: 8px;
  padding-left: 8px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
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

const Tweet = ({
  content,
  username,
  usertag,
  createdAt,
  _id,
  comments,
  retweets,
  onRetweetClick
}) => {
  const { user } = useContext(UserContext)
  const { handleCommentClick } = useContext(ModalContext)

  const handleRetweetClick = async () => {
    if (user) {
      await retweet(user._id, _id)
      await onRetweetClick()
    }
  }

  return (
    <Container>
      <Link to={`/tweets/${_id}`}>
        <Box>
          <Inner>
              <Top>
                <Username>{username}</Username>
                <Date>&nbsp;{`· ${formatDate(createdAt)}`}</Date>
              </Top>
              <Link to={`/${username}`}>
                <Usertag>{usertag}</Usertag>
              </Link>
            {content}
          </Inner>
        </Box>
      </Link>
      <Footer>
        <Action
          onClick={() => handleCommentClick(_id)}
          color={blue}
        >
          <Chat className='chat' color={grey} />
          {comments.length}
        </Action>
        <Action
          color={green}
          onClick={handleRetweetClick}
        >
          <ArrowRepeat size={20} className='retweet' color={grey} />
          {retweets.length}
        </Action>
      </Footer>
    </Container>
  )
}

export default Tweet