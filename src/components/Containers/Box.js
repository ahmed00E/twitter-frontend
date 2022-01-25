import styled from 'styled-components'

import Avatar from '../Avatar'

const Container = styled.div`
  padding: 12px 16px;
  display: flex;
`

const AvatarContainer = styled.div`
  width: 48px;
`

const Box = ({ children }) => {
  return (
    <Container>
      <AvatarContainer>
        <Avatar />
      </AvatarContainer>
      {children}
    </Container>
  )
}

export default Box
