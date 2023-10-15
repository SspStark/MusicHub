import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {BiHide, BiShow} from 'react-icons/bi'
import '../LoginPage.css'

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, togglePassword] = useState(false)
  const [showErrorMsg, updateError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signUp = () => {
    navigate('/sign-up')
  }

  const forgotPassword = () => {
    alert("what a fucking idiot you are, can't even remember password")
  }

  const loginUser = async event => {
    event.preventDefault()
    setIsLoading(true)
    const {username, password} = loginData
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch('http://localhost:3004/login', options)
      const data = await response.json()
      if (response.ok) {
        console.log(data.msg)
        setLoginData({username: '', password: ''})
        updateError(false)
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
      <form className="form" onSubmit={loginUser}>
        <div className="website-logo">
          <img
            src="https://res.cloudinary.com/dvgymshsh/image/upload/v1694350601/music-logo_gykg7f.jpg"
            alt="website logo"
          />
          <p>MusicHub</p>
        </div>
        <div className="input-box">
          <label>Username</label>
          <input
            className="email-user"
            type="text"
            value={loginData.username}
            placeholder="Username"
            onChange={event =>
              setLoginData({
                ...loginData,
                username: event.target.value,
              })
            }
            required
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <div className="password-container">
            <input
              className="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              placeholder="Password"
              onChange={event =>
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                })
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
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'logging in...' : 'Login'}
        </button>
        {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        <p className="forgot-password" onClick={forgotPassword}>
          Forgot your password?
        </p>
      </form>
      <p className="sign-up-login">
        Don't have an account? <span onClick={signUp}>Sign up</span>
      </p>
    </div>
  )
}

export default LoginPage
