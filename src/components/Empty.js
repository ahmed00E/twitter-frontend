import styled from 'styled-components'

import { borderColor } from '../styles/colors'

const Container = styled.div`
  border-top: solid 1px ${borderColor};
  width: 100%;
  font-family: 'ChirpBold';
  padding: 16px;

  &:nth-last-child(1) {
    border-bottom: solid 1px ${borderColor};
  }
`

const Empty = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Empty
