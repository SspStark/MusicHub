import {createContext} from 'react'
//import PropTypes from 'prop-types'

const MusicHubContext = createContext({
  isThemeDark: true,
  toggleTheme: () => {},
})

/*export const MusicHubProvider = ({children}) => {
  const [isThemeDark, setTheme] = useState(false)

  const toggleTheme = () => setTheme(prevTheme => !prevTheme)

  const contextValue = {
    isThemeDark,
    toggleTheme,
  }

  return (
    <MusicHubContext.Provider value={contextValue}>
      {children}
    </MusicHubContext.Provider>
  )
}

MusicHubProvider.propTypes = {
  children: PropTypes.node.isRequired,
} */

export default MusicHubContext
