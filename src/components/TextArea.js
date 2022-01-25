import styled from 'styled-components'

import { Form } from 'react-bootstrap'
import { white } from '../styles/colors'

const Textarea = styled(Form.Control)`
  height: ${props => props.height || '100px'};
  width: 100%;
  background: transparent;
  color: ${white};
  outline: 0;
  padding: 12px 12px;
  margin-bottom: ${props => props.error ? '8px' : '24px'};
  border-style: none;
  font-size: 24px;
  resize: none;

  &:focus {
    background: transparent;
    color: ${white};
    outline: 0;
    box-shadow: none;
  }
`

const TextArea = ({ height, placeholder, onChange, value, name }) => {
  return (
    <Textarea
      as="textarea"
      placeholder={placeholder}
      height={height}
      onChange={onChange}
      value={value}
      name={name}
    />
  )
}

export default TextArea