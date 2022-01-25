import { useContext } from "react"
import styled from 'styled-components'

import { UserContext } from "../../contexts/User"
import { ModalContext } from "../../contexts/Modal"
import Link from './Link'
import Bird from "../../images/svgs/bird"
import Home from "../../images/svgs/home"
import Hashtag from "../../images/svgs/hasthag"
import Bell from "../../images/svgs/bell"
import Message from "../../images/svgs/message"
import Profile from "../../images/svgs/profile"
import More from "../../images/svgs/more"
import Settings from "../../images/svgs/settings"
import Button from "../Button"
import { H4 } from '../../styles/typography'
import { white, blue, offBlue, red, offRed } from "../../styles/colors"

import { logOut } from "../../api/auth"
import { useNavigate } from "react-router-dom"

const Container = styled.header`
  padding: 16px;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = () => {
  const navigate = useNavigate()

  const { user } = useContext(UserContext)
  const { handleNewTweetClick } = useContext(ModalContext)

  const logout = async () => {
    await logOut()
    navigate('/')  
  }
  return (
    <Container>
      <Upper>
        <Link to="/home" samePadding>
          <Bird
            fill={white}
            width='32px'
            height='32px'
          />
        </Link>
        <Link to="/home">
          <Home
            fill={white}
            width='26px'
            height='26px'
          />
          <H4>Home</H4>
        </Link>
        <Link to={`/users`}>
          <Profile
            fill={white}
            width='26px'
            height='26px'
          />
          <H4>Users</H4>
        </Link>

        {!user ? (
          <Link to="/settings">
            <Settings
              fill={white}
              width='26px'
              height='26px'
            />
            <H4>Settings</H4>
          </Link>
        ) : (
          <>
            <Link to="/explore">
              <Hashtag
                fill={white}
                width='26px'
                height='26px'
              />
              <H4>Explore</H4>
            </Link>

            <Link to="/notifications">
              <Bell
                fill={white}
                width='26px'
                height='26px'
              />
              <H4>Notifications</H4>
            </Link>

            <Link to="/messages">
              <Message
                fill={white}
                width='26px'
                height='26px'
              />
              <H4>Messages</H4>
            </Link>

            <Link to={`/${user.username}`}>
              <Profile
                fill={white}
                width='26px'
                height='26px'
              />
              <H4>Profile</H4>
            </Link>

            <Link to="/profile">
              <More
                fill={white}
                width='26px'
                height='26px'
              />
              <H4>More</H4>
            </Link>

            <Button
              round
              background={blue}
              large
              hover={{
                background: offBlue
              }}
              margintop="24px"
              onClick={handleNewTweetClick}
            >
              Tweet
            </Button>
          </>
        )}
      </Upper>
      <Button
        background={red}
        round
        hover={{
          background: offRed
        }}
        onClick={logout}
      >
        Log out
      </Button>
    </Container>
  )
}

export default Header
