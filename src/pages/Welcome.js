import styled from "styled-components"

import { Row, Col } from "react-bootstrap"
import Button from "../components/Button"
import Bird from "../images/svgs/bird"
import { grey, blue, white, offBlue, veryOffWhite } from "../styles/colors"
import { useContext } from "react"
import { ModalContext } from "../contexts/Modal"
import { H1, H2 } from '../styles/typography'

const Container = styled(Row)`
  height: calc(100vh - 50px);
`

const ImageContainer = styled(Col)`
  background-image: url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png');
  background-position: center;
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
`

const Footer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const FooterLink = styled.span`
  font-size: 10px;
  cursor: pointer;
  color: ${grey};

  &:hover {
    text-decoration: underline;
  }
`

const Disclaimer = styled.div`
  font-size: 11px;
  max-width: 300px;
`

const Account = styled.p`
  font-weight: bold;
  margin-top: 64px;
  margin-bottom: 16px;
  font-family: 'ChirpBold';
`

const Home = () => {
  const { handleSignupClick, handleLoginClick } = useContext(ModalContext)

  return (
    <>
      <Container>
        <ImageContainer xs={7}>
          <Bird
            fill='white'
            height='341px'
            width='341px'
          />
        </ImageContainer>
        <Main xs={5}>
          <Bird
            fill={white}
            height='36px'
            width='36px'
          />
          <H1>Happening now</H1>
          <H2>Join Twitter today.</H2>
          <Button
            round
            background={blue}
            onClick={handleSignupClick}
            hover={{
              background: offBlue
            }}
          >
            Sign up with a phone number or email address
          </Button>
          <Account>Already have an account?</Account>
          <Button
            round
            color={blue}
            outline
            onClick={handleLoginClick}
            hover={{
              background: veryOffWhite,
              color: blue,
              borderColor: white
            }}
          >
            Sign in
          </Button>
          <br />
          <Disclaimer>
            <span>
              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
            </span>
          </Disclaimer>
        </Main>
      </Container>
      <Footer>
        <FooterLink to="#">
          About
        </FooterLink>
        <FooterLink to="#">
          Help Center
        </FooterLink>
        <FooterLink to="#">
          Terms of Service
        </FooterLink>
        <FooterLink to="#">
          Privacy Policy
        </FooterLink>
        <FooterLink to="#">
          Cookie Policy
        </FooterLink>
        <FooterLink to="#">
          Accessibility
        </FooterLink>
        <FooterLink to="#">
          Ads info
        </FooterLink>
        <FooterLink to="#">
          Blog
        </FooterLink>
        <FooterLink to="#">
          Status
        </FooterLink>
        <FooterLink to="#">
          Careers
        </FooterLink>
        <FooterLink to="#">
          Brand Resources
        </FooterLink>
        <FooterLink to="#">
          Advertising
        </FooterLink>
        <FooterLink to="#">
          Marketing
        </FooterLink>
        <FooterLink to="#">
          Twitter for Business
        </FooterLink>
        <FooterLink to="#">
          Developers
        </FooterLink>
        <FooterLink to="#">
          Directory
        </FooterLink>
        <FooterLink to="#">
          Settings
        </FooterLink>
        <FooterLink>
          © 2022 Twitter, Inc.
        </FooterLink>
      </Footer>
    </>
  )
}

export default Home
