import { useContext } from 'react'
import styled from 'styled-components'

import { blue, white, offWhite, offBlue } from '../styles/colors'
import { UserContext } from '../contexts/User'
import { MainContainer, RightContainer, LeftContainer } from './Containers/Containers'
import { H3, P } from '../styles/typography'
import Button from './Button'
import { ModalContext } from '../contexts/Modal'

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${blue};
  padding: 12px 0px;
  color: white;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 16px;
`

const AuthFooter = () => {
  const { user } = useContext(UserContext)
  const { handleLoginClick, handleSignupClick } = useContext(ModalContext)

  return (
    <>
    {!user &&
      <Footer>
        <MainContainer>
          <LeftContainer />
          <RightContainer>
            <div>
              <H3 noMargin>Don’t miss what’s happening</H3>
              <P noMargin>People on Twitter are the first to know.</P>
            </div>
            <ButtonsContainer>
            <Button
              background={blue}
              round
              color="white"
              hover={{
                background: offBlue,
                color: "white"
              }}
              border={white}
              onClick={handleLoginClick}
            >
              Log in
            </Button>
            <Button
              round
              background={white}
              color="black"
              hover={{
                background: offWhite,
                color: "black"
              }}
              onClick={handleSignupClick}
            >
              Sign up
            </Button>
            </ButtonsContainer>
          </RightContainer>
        </MainContainer>
      </Footer>
    }
    </>
  )
}

export default AuthFooter