import styled from 'styled-components'

import { Date, H4 } from '../../styles/typography'
import { offBlack } from '../../styles/colors'

const Container = styled.div`
  height: 53px;
  width: 100%;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 16px;
  z-index: 2;
  background-color: ${offBlack};
  backdrop-filter: blur(12px);
`

const PageHeader = ({ title, subtitle }) => {
  return (
    <Container>
      <H4 bold noMargin>{title}</H4>
      {subtitle && <Date>{subtitle}</Date>}
    </Container>
  )
}

export default PageHeader
