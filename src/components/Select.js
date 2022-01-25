import styled from 'styled-components'

import { Form } from 'react-bootstrap'
import { white, red, grey } from '../styles/colors'

const Select = styled(Form.Select)`
  background: transparent;
  color: ${white};
  outline: 0;
  padding: 12px 12px;
  margin-bottom: ${props => props.error ? '8px' : '24px'};
  border: solid 1px ${props => props.error ? red : grey};
  transition: border 0.1s;
`

const SelectComponent = ({ options, initialOption, onChange, value, name, error }) => {
  return (
    <Select
      onChange={onChange}
      value={value}
      name={name}
      error={error}
    >
      {initialOption &&
        <option value={initialOption.value}>
          {initialOption.label}
        </option>
      }

      {options.map(option => (
        <option
          key={option.label}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default SelectComponent
