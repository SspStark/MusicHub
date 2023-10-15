import {Routes, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Home from './components/Home'

import './App.css'

const App = () => (
  <Routes>
    <Route exact path="/" element={<LoginPage />} />
    <Route exact path="/musichub/sign-up" element={<SignUpPage />} />
    <Route exact path="/musichub/home" element={<Home />} />
  </Routes>
)

export default App
