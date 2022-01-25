import styled from "styled-components";

import { getRandomColor } from "../helpers/colors"

const Container = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.background};
  border-radius: 24px;
`

const Avatar = () => {
  return (
    <Container background={getRandomColor()} />
  )
}

export default Avatar;