import { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../contexts/User'
import AuthFooter from '../components/AuthFooter'
import { MainContainer, LeftContainer, RightContainer } from '../components/Containers/Containers'
import Header from '../components/Headers/Header'
import { borderColor } from '../styles/colors'
import Loader from '../components/Loader'

const Page = styled.div`
  min-width: 100vh;
  position: relative;
`

const Feed = styled.div`
  width: 598px;
  border-left: solid 1px ${borderColor};
  border-right: solid 1px ${borderColor};
`


const Main = ({ children, loading, header }) => {
  const { user } = useContext(UserContext)

  return (
    <Page>
      <MainContainer>
        <LeftContainer>
          <Header />
        </LeftContainer>
        <RightContainer>
          <Feed>
            {header && header}
            {loading ?
              <Loader />
            :
              <>{children}</>
            }
          </Feed>
        </RightContainer>
      </MainContainer>
      {!user && <AuthFooter /> }
    </Page>
  )
}

export default Main