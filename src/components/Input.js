import styled from "styled-components"

import { FormControl } from "react-bootstrap"
import { white, blue, grey, red } from "../styles/colors"
import { ErrorMessage } from '../styles/typography'

const Input = styled(FormControl)`
  background: transparent;
  color: ${white};
  outline: 0;
  padding: 12px 12px;
  margin-bottom: ${props => props.error ? '8px' : '24px'};
  border: solid 1px ${props => props.error ? red : grey};
  transition: border 0.1s;
  ${props => {
    if (props.$large) {
      return `height: 100px !important;`
    }
  }}

  &:focus {
    background: transparent;
    color: ${white};
    outline: 0;
    box-shadow: none;
    border: solid 1px ${props => props.error ? red : blue};
  }
`

const InputComponent = ({ placeholder, name, type, onChange, value, error, large }) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value ={value}
        error={error}
        $large={large}
      />
      {error && <ErrorMessage marginBottom>{error}</ErrorMessage>}
    </>
  )
}

export default InputComponent
