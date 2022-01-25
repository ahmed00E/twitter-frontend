import { useContext } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import Box from './Containers/Box'
import { Username, Usertag } from '../styles/typography' 
import { borderColor } from '../styles/colors'
import { UserContext } from '../contexts/User'
import Button from '../components/Button'
import { white, offWhite } from '../styles/colors'

import { follow } from '../api/users'

const Container = styled.div`
  border-top: solid 1px ${borderColor};
  width: 100%;

  ${props => {
    if (!props.noBottomBorder) {
      return `
        &:nth-last-child(1) {
          border-bottom: solid 1px ${borderColor};
        }  
      `
    }
  }}
`

const Inner = styled.div`
  padding-top: 8px;
  padding-left: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const User = ({ username, usertag, _id, followCallback, noBottomBorder }) => {
  const { user, getUser } = useContext(UserContext)

  const follows = user && user.followings.includes(_id)

  const handleFollowClick = async () => {
    await follow({ profileId: _id })
    await getUser()

    if (followCallback) {
      console.log('in callback')
      await followCallback()
    }
  }

  return (
    <Container noBottomBorder={noBottomBorder}>
      <Box>
        <Inner>
          <div>
            <Username>{username}</Username>
            <Link to={`/${username}`}>
              <Usertag>{usertag}</Usertag>
            </Link>
          </div>

          {user && _id !== user._id &&
            <Button
              round
              background={white}
              border={white}
              color="black"
              hover={{
                background: offWhite,
                color: "black"
              }}
              onClick={handleFollowClick}
              disabled={follows}
              disabledBackground={offWhite}
            >
              {follows ? 'Followed' : 'Follow'}
            </Button>
          }
        </Inner>
      </Box>
    </Container>
  )
}

export default User