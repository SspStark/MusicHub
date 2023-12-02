import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon} from 'react-icons/bs'
import {FiSun} from 'react-icons/fi'
import MusicHubContext from '../../context/MusicHubContext'

import {
  HeaderTag,
  HeaderLogo,
  HeaderElements,
  ChangeTheme,
  LogoutButton,
} from './styledComponents'

const Header = () => {
  const {isThemeDark, toggleTheme} = useContext(MusicHubContext)
  const navigate = useNavigate()

  const Logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <HeaderTag theme={isThemeDark}>
      <HeaderLogo
        src="https://res.cloudinary.com/dvgymshsh/image/upload/v1694350601/music-logo_gykg7f.jpg"
        alt="header-logo"
      />
      <HeaderElements>
        <ChangeTheme onClick={toggleTheme}>
          {isThemeDark ? (
            <FiSun color="white" size={25} />
          ) : (
            <BsMoon color="black" size={25} />
          )}
        </ChangeTheme>
        <LogoutButton type="button" theme={isThemeDark} onClick={Logout}>
          Logout
        </LogoutButton>
      </HeaderElements>
    </HeaderTag>
  )
}

export default Header
