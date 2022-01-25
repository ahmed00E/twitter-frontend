import styled from "styled-components";

const MainContainer = styled.div`
  width: 1260px;
  margin: 0 auto;
  display: flex;
  position: relative;
`
  
const RightContainer = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const LeftContainer = styled.div`
  min-width: 270px;
  position: relative;
`

export {
  RightContainer,
  MainContainer,
  LeftContainer
}
