import styled from 'styled-components'

import { Spinner } from 'react-bootstrap'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
`

const Loader = () => {
  return (
    <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  )
}

export default Loader
