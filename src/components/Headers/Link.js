import styled from 'styled-components'
import { Link as RouterLink } from "react-router-dom"

import { white, veryOffWhite } from "../../styles/colors"

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: ${white};
`
  
const Container = styled.div`
  padding: 12px;
  padding-right: ${props => props.samePadding ? '12px' : '24px'};
  border-radius: 30px;
  display: inline-flex;
  gap: 16px;
  flex: 0;
  
  &:hover {
    background: ${veryOffWhite};
    color: ${white};
  }
`

const Link = ({ children, to, samePadding }) => {
  return (
    <StyledLink to={to}>
      <Container samePadding={samePadding}>
        {children}
      </Container>
    </StyledLink>
  )
}

export default Link
