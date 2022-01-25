import { useContext } from 'react'
import styled from 'styled-components'

import { Modal } from 'react-bootstrap'
import { ModalContext } from '../contexts/Modal'
import Close from '../images/svgs/close'
import { white } from '../styles/colors'

const Container = styled.div`
  padding: 16px;
  padding-top: 64px;
  padding-bottom: 64px;
  background: black;
  border-radius: 15px;
  position: relative;
`

const CloseContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1)
  }
`

const ModalComponent = ({ children, opened, onHide }) => {
  const { visible, close } = useContext(ModalContext)

  return (
    <Modal
      show={opened || visible}
      onHide={onHide || close}
      centered
    >
      <Container>
        <CloseContainer
          onClick={onHide || close}
        >
          <Close
            fill={white}
            width="20px"
            height="20px"
          />
        </CloseContainer>
        {children}
      </Container>
    </Modal>
  ) 
}

export default ModalComponent