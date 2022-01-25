import styled from 'styled-components'

import { Button } from 'react-bootstrap'
import { white, offWhite } from '../styles/colors' 

const Bold = styled.span`
  font-family: 'ChirpBold';
`

const Btn = styled(Button)`
  ${props => {
    if (props.background) {
      return (
        `background-color: ${props.background};
        border-color: ${props.background};`
      )
    }
  }}
  ${props => {
    if (props.$round) {
      return `border-radius: 30px;`
    }
  }}
  ${props => {
    if (props.$outline) {
      return (
        `background-color: transparent;
        border: solid 1px ${white};`
      )
    }
  }}
  ${props => {
    if (props.color) {
      return `color: ${props.color};`
    }
  }}
  ${props => {
    if (props.width) {
      return `width: ${props.width};`
    } else {
      return `max-width: 266px;`
    }
  }}
  ${props => {
    if (props.border) {
      return `border: solid 1px ${props.border};`
    }
  }}
  ${props => {
    if (props.hover) {
      return (
        `&:hover {
          color: ${props.hover.color};
          background-color: ${props.hover.background};
        }`
      )
    }
  }}
  ${props => {
    if (props.$large) {
      return `padding: 16px 0px;`
    }
  }}
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: none;
  margin-top: ${props => props.margintop ? props.margintop : '0px'};
  
  &:hover {
    border: ${props => `solid 1px ${props.background ? props.background : offWhite};`}
  }

  &:focus, &:active {
    background-color: ${props => props.background ? props.background : 'transparent'};
    color: ${props => props.color};
    border: solid 1px ${props => props.background ? props.background : white};
    box-shadow: none;
  }

  &:disabled {
    background-color: ${props => props.$disabledBackground ? props.$disabledBackground : props.background};
    border: solid 1px ${props => props.$disabledBackground};
    color: ${props => props.color};
  }
`

const ButtonComponent = ({
  children,
  round,
  background,
  color,
  outline,
  onClick,
  width,
  type,
  hover,
  border,
  large,
  margintop,
  disabled,
  disabledBackground
}) => {
  return (
    <Btn
      $round={round}
      background={background}
      onClick={onClick}
      color={color}
      $outline={outline}
      type={type}
      width={width}
      hover={hover}
      border={border}
      $large={large}
      margintop={margintop}
      disabled={disabled}
      $disabledBackground={disabledBackground}
    >
      <Bold>
        {children}
      </Bold>
    </Btn>
  )
}


export default ButtonComponent