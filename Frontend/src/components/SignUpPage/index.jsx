import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {BiHide, BiShow} from 'react-icons/bi'
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

  const login = () => {
    navigate('/')
  }

  const signupUser = async event => {
    event.preventDefault()
    setIsLoading(true)
    const {email, username, password} = signupData
    const userDetails = {email, username, password}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('http://localhost:3004/sign-up', options)
      const data = await response.json()
      if (response.ok) {
        console.log(data.msg)
        setSignupData({email: '', username: '', password: ''})
        navigate('/musichub/login')
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
          />
        </div>
        <div className="input-box">
          <p className="input-label">Create a strong password</p>
          <div className="password-container">
            <input
              className="password"
              type={showPassword ? 'text' : 'password'}
              value={signupData.password}
              placeholder="Password"
              onChange={event =>
                setSignupData({...signupData, password: event.target.value})
              }
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
          <p className="password-validates">
            *must be atleast 8 characters and one capital, lowercase, special
            character, number
          </p>
        </div>

        <button type="submit" className="sign-up-btn" disabled={isLoading}>
          {isLoading ? 'signing up...' : 'Sign up'}
        </button>
        {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
      </form>
      <p className="sign-up-login">
        Have an account? <span onClick={login}>Login</span>
      </p>
    </div>
  )
}

export default SignUpPage
