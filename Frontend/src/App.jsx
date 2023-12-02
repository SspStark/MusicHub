import {useState} from 'react'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'
import MusicHubContext from './context/MusicHubContext'
import Header from './components/Header'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Home from './components/Home'
import './App.css'

const PrivateRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (!jwtToken) {
    return <Navigate to="/login" />
  }

  return (
    <div className="app-container">
      <Header />
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  )
}

const App = () => {
  const [isThemeDark, setTheme] = useState(true)

  const toggleTheme = () => setTheme(prevTheme => !prevTheme)

  return (
    <MusicHubContext.Provider value={{isThemeDark, toggleTheme}}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          {/* Add other routes that should be private */}
        </Route>
      </Routes>
    </MusicHubContext.Provider>
  )
}

export default App
