import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
  const [songsData, setSongsData] = useState()
  const [isLoading, setStatus] = useState(true)

  useEffect(() => {
    const getSongsData = async () => {
      try {
        const response = await axios.get('http://localhost:3004/api/songs')
        setSongsData(response.data)
        setStatus(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }
    getSongsData()
  }, [])

  const renderSongs = () => (
    <ul>
      {songsData.map(eachSong => {
        const byteArray = new Uint8Array(eachSong.song_file.data) // Access the byte data directly

        const blob = new Blob([byteArray], {type: 'audio/mp3'})
        const url = URL.createObjectURL(blob)

        return (
          <li key={eachSong.song_name}>
            <h1>{eachSong.song_name}</h1>
            <audio controls>
              <source src={url} type="audio/mp3" />
            </audio>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <h1>Welcome to MusicHub</h1>
      {isLoading ? <h1>Loading...</h1> : renderSongs()}
    </>
  )
}

export default Home
