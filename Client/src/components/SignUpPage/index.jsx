import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiHide, BiShow} from 'react-icons/bi'
import {IoMdInformationCircleOutline} from 'react-icons/io'
import '../LoginPage.css'
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [showPassword, togglePassword] = useState(false)
  const [showErrorMsg, updateError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      navigate('/', {replace: true})
    }
  }, [navigate])
  const login = () => {
    navigate('/login')
  }
  const signupUser = async event => {
    event.preventDefault()
    setIsLoading(true)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    }
    try {
      const response = await fetch(
        'https://musichub-backend-2e5p.onrender.com/sign-up',
        options,
      )
      const data = await response.json()
      if (response.ok) {
        setSignupData({email: '', username: '', password: ''})
        navigate('/login')
      } else {
        updateError(true)
        setErrorMsg(data.error)
      }
    } catch (error) {
      console.error('Error during sign-up:', error)
      updateError(true)
      setErrorMsg('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="login-sign-up-page">
      <form className="form" onSubmit={signupUser}>
        {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        <div className="website-logo">
          <img
            src="https://res.cloudinary.com/dvgymshsh/image/upload/v1694350601/music-logo_gykg7f.jpg"
            alt="website logo"
          />
          <p>MusicHub</p>
        </div>
        <div className="input-box">
          <p className="input-label">Enter your email</p>
          <input
            className="email-user"
            type="text"
            value={signupData.email}
            placeholder="Email"
            onChange={event =>
              setSignupData({...signupData, email: event.target.value})
            }
            required
          />
        </div>
        <div className="input-box">
          <p className="input-label">Create a username</p>
          <input
            className="email-user"
            type="text"
            value={signupData.username}
            placeholder="Username"
            onChange={event =>
              setSignupData({...signupData, username: event.target.value})
            }
            required
          />
        </div>
        <div className="input-box">
          <div className="password-heading">
            <p className="input-label">Create a strong password</p>
            <IoMdInformationCircleOutline
              className="i-icon"
              title="must be atleast 8 characters, 1 capital, 1 lowercase, 1 special
            character, 1 number"
            />
          </div>
          <div className="password-container">
            <input
              className="password"
              type={showPassword ? 'text' : 'password'}
              value={signupData.password}
              placeholder="Password"
              onChange={event =>
                setSignupData({...signupData, password: event.target.value})
              }
              required
            />
            <div
              className="p-icon-container"
              onClick={() => togglePassword(showPassword => !showPassword)}
            >
              {showPassword ? (
                <BiShow title="hide password" size={20} />
              ) : (
                <BiHide title="show password" size={20} />
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="sign-up-btn" disabled={isLoading}>
          {isLoading ? 'signing up...' : 'Sign up'}
        </button>
      </form>
      <p className="sign-up-login">
        Have an account? <span onClick={login}>Login</span>
      </p>
    </div>
  )
}
export default SignUpPage