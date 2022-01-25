import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import styled from 'styled-components'
import moment from "moment"

import Main from "../layouts/Main"

import PageHeader from "../components/Headers/PageHeader"
import ProfilePicture from "../components/ProfilePicture"

import { UserContext } from "../contexts/User"
import { ModalContext } from "../contexts/Modal"
import Button from "../components/Button"
import Tweet from "../components/Tweet"
import User from "../components/User"
import Empty from "../components/Empty"
import { Date, H3, Usertag } from "../styles/typography"
import { offWhite, veryOffWhite, white, veryVeryOffWhite, blue, grey } from "../styles/colors"
import { Link45deg, Calendar3 } from 'react-bootstrap-icons' 

import { getUser, follow } from "../api/users"
import { getRandomColor } from "../helpers/colors"

const BannerContainer = styled.div`
  position: relative;
`

const Banner = styled.div`
  height: 200px;
  background: ${props => props.background};
`

const ProfilePictureContainer = styled.div`
  width: 136px;
  height: 136px;
  position: absolute;
  bottom: 0;
  left: 16px;
  z-index: 1;
`

const ActionsContainer = styled.div`
  height: 68px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 0px 16px;
`

const Nav = styled.div`
  display: flex;
`

const NavItem = styled.div`
  position: relative;
  width: 25%;
  padding: 16px 0px;
  color: ${offWhite};
  font-family: 'ChirpBold';
  text-align: center;
  cursor: pointer;

  ${props => {
    if (props.active) {
      return `
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: calc(50% - 38px);
          width: 76px;
          height: 5px;
          background: ${blue};
          border-radius: 3px;
        }
      `   
    }
  }}
  
  &:hover {
    background: ${veryVeryOffWhite};
  }
`

const Info = styled.div`
  padding: 16px;

  a {
    color: ${blue};
  }

  svg {
    margin-right: 8px;
  }
`

const Profile = () => {
  const { username } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { user, getUser: getUserContext } = useContext(UserContext)
  const { handleEditProfileClick } = useContext(ModalContext)

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('tweets')

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line
  }, [location])

  const fetchProfile = async () => {
    const fetchedUser = await getUser(username)
    
    if(!fetchedUser || fetchedUser.error) {
      navigate('/not-found')
    }

    setProfile(fetchedUser)
    setLoading(false)
  }

  const handleFollowClick = async () => {
    await follow({ profileId: profile._id })
    await getUserContext()
    await fetchProfile()
  }

  if (!profile) {
    return null
  }

  return (
    <Main
      loading={loading}
      header={profile && <PageHeader
        title={profile.username}
        subtitle={`${profile.tweets.length} tweets`}
      />}
    >
      <BannerContainer>
        <Banner background={getRandomColor()} />
        <ProfilePictureContainer>
          <ProfilePicture />
        </ProfilePictureContainer>
        <ActionsContainer>
          {user && user.username === profile.username &&
            <Button
              round
              outline
              border={offWhite}
              hover={{
                background: veryOffWhite,
              }}
              onClick={handleEditProfileClick}
            >
              Edit profile
            </Button>
          }       
          {user && user.username !== profile.username &&
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
              disabled={user.followings.includes(profile._id)}
              disabledBackground={offWhite}
            >
              {user.followings.includes(profile._id) ? 'Followed' : 'Follow'}
            </Button>
          }
        </ActionsContainer>
      </BannerContainer>

      <Info>
        <H3 noMargin>{profile.username}</H3>
        <Usertag>{profile.usertag}</Usertag>
        {profile.bio && <p>{profile.bio}</p>}
        {profile.website &&
          <>
            <Link45deg color={grey} />
            <a href={profile.website}>{profile.website}</a>
          </>
        }
        <Date>
          <Calendar3 />
          Joined {moment(profile.createdAt).format('MMMM YYYY')}
        </Date>
      </Info>

      <Nav>
        <NavItem
          active={tab === 'tweets'}
          onClick={() => setTab('tweets')}
        >
          <b>Tweets</b>
        </NavItem>
        <NavItem
          active={tab === 'retweets'}
          onClick={() => setTab('retweets')}
        >
          <b>Retweets</b>
        </NavItem>
        <NavItem
          active={tab === 'followers'}
          onClick={() => setTab('followers')}
        >
          <b>Followers</b>
        </NavItem>
        <NavItem
          active={tab === 'followings'}
          onClick={() => setTab('followings')}
        >
          <b>Followings</b>
        </NavItem>
      </Nav>
      
      {tab === 'tweets' &&
        <>
          {profile.tweets.length === 0 ?
            <Empty>No tweets</Empty>
          :
            profile.tweets.map(tweet => (
              <Tweet
                key={tweet.createdAt}
                content={tweet.content}
                username={tweet.author.username}
                usertag={tweet.author.usertag}
                createdAt={tweet.createdAt}
                comments={tweet.comments}
                retweets={tweet.retweets}
                _id={tweet._id}
              />
            )) 
          }
        </>
      }

      {tab === 'retweets' &&
        <>
          {profile.retweets.length === 0 ?
            <Empty>No retweets</Empty>
          :
            profile.retweets.map(tweet => (
              <Tweet
                key={tweet.createdAt}
                content={tweet.content}
                username={tweet.author.username}
                usertag={tweet.author.usertag}
                createdAt={tweet.createdAt}
                comments={tweet.comments}
                retweets={tweet.retweets}
                _id={tweet._id}
              />
            ))
          }
        </>
      }

      {tab === 'followers' &&
        <>
          {profile.followers.length === 0 ?
            <Empty>No followers</Empty>
          :
            profile.followers.map(follower => (
              <User
                key={follower.username}
                username={follower.username}
                usertag={follower.usertag}
                _id={follower._id}
              />
            ))
          }
        </>
      }

      {tab === 'followings' &&
        <>
          {profile.followings.length === 0 ?
            <Empty>No followings</Empty>
          :
            profile.followings.map(following => (
              <User
                key={following.username}
                username={following.username}
                usertag={following.usertag}
                _id={following._id}
              />
            ))
          }
        </>
      }
    </Main>
  )
}

export default Profile
