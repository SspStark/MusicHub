import styled from 'styled-components'
export const HeaderTag = styled.header`
  background-color: ${props => (props.theme === true ? 'black' : 'white')};
  color: ${props => (props.theme === true ? 'white' : 'black')};
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 1;
`
export const HeaderLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`
export const HeaderElements = styled.div`
  display: flex;
  width: 70%;
  justify-content: end;
  align-items: center;
`
export const ChangeTheme = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
export const LogoutButton = styled.button`
  color: ${props => (props.theme === true ? '#f9f9f9' : '#3b82f6')};
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid ${props => (props.theme === true ? '#f9f9f9' : '#3b82f6')};
  padding: 5px 18px;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0px 5px 0px 15px;
`