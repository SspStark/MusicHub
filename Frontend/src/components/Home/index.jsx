import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
  const [songsData, setSongsData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSongsData = async () => {
      try {
        const response = await axios.get(
          'https://musichub-backend-2e5p.onrender.com/audio',
        )
        setSongsData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }
    getSongsData()
  }, [])

  const renderSongs = () => (
    <ul>
      {songsData.map(eachSong => (
        <li key={eachSong.title}>
          <h1>{eachSong.title}</h1>
          <audio controls>
            <source src={eachSong.audioUrl} type="audio/mp3" />
          </audio>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <h1>Welcome to MusicHub</h1>
      {isLoading ? <p>Loading...</p> : renderSongs()}
    </>
  )
}

export default Home
