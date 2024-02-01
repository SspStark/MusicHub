import styled from 'styled-components'

export const HomeBg = styled.div`
  background-color: ${props => (props.theme == true ? '#1b1c1c' : '#edf2f2')};
  margin-top: 70px;
  padding: 20px;
`
export const HomeHeading = styled.h1`
  color: ${props => (props.theme === true ? 'white' : 'black')};
  margin-top: 0;
`
export const LoadingText = styled.p`
  color: ${props => (props.theme === true ? 'white' : 'black')};
  font-size: 18px;
  font-weight: 500;
`
export const AudioTitle = styled.p`
  color: ${props => (props.theme === true ? 'white' : 'black')};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0px;
`
export const Artist = styled.p`
  color: #94a69b;
  font-size: 16px;
  margin-top: 5px;
`
