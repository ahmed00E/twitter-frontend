import styled from "styled-components";

import { getRandomColor } from "../helpers/colors"

const Container = styled.div`
  width: 134px;
  height: 134px;
  border: solid 3px black;
  border-radius: 68px;
  background: ${props => props.background};
`

const ProfilePicture = () => {
  return (
    <Container background={getRandomColor()} />
  )
}

export default ProfilePicture
