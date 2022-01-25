import styled from 'styled-components'

import { grey, red } from './colors'

export const H1 = styled.h1`
  font-size: 56px;
  line-height: 84px;
  margin: 48px 0;
  font-family: 'ChirpHeavy';
  letter-spacing: -1.2px;
`

export const H2 = styled.h2`
  font-size: 28px;
  margin-bottom: 32px;
  font-family: 'ChirpHeavy';
`

export const H3 = styled.h3`
  font-size: 24px;
  margin-bottom: 24px;
  font-family: 'ChirpBold';
  ${props => {
    if (props.noMargin) {
      return `margin: 0;`
    }
  }}
`

export const H4 = styled.h4`
  font-size: 20px;
  margin-bottom: 20px; 
  margin: 0;

  ${props => {
    if (props.bold) {
      return `font-family: 'ChirpBold';`;
    }
  }}
`

export const P = styled.p`
  ${props => {
    if (props.noMargin) {
      return `margin: 0;`
    }
  }}
`

export const ErrorMessage = styled.p`
  color: ${red};
  font-family: 'ChirpBold';
  margin-bottom: ${props => props.marginBottom ? '24px' : '0px' };
  font-size: 14px;
  margin-top: ${props => props.marginTop ? '24px' : '0px' };
`

export const Username = styled.p`
  margin: 0;
  font-family: 'ChirpBold';
  line-height: 1;
`

export const Date = styled.p`
  margin: 0;
  color: ${grey};
  font-size: 14px;
  line-height: 1;
`

export const Usertag = styled.p`
  margin: 0;
  color: ${grey};
  font-size: 14px;
`

export const TweetContent = styled.span`
  font-size: 24px;
`