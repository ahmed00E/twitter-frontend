import styled from 'styled-components'

import Main from '../layouts/Main'
import { H1, H2 } from "../styles/typography"

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const NotFound = () => {
  return (
    <Main>
      <Container>
        <div>
          <H1>Page under construction</H1>
          <H2>Stay tuned</H2>
        </div>
      </Container>
    </Main>
  )
}

export default NotFound