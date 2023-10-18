import {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
  const [songsData, setSongsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentAudio, setCurrentAudio] = useState(null)

  /*we can also use useRef to store the references of audio elements in audioRefs object based on their id.
  useRef is a Hook in React that allows you to create mutable object with a .current property, 
  which can be used to hold values across renders. It's often used to store references to DOM elements or 
  to hold any mutable value that persists across re-renders without causing a re-render when the value changes.

  const audioRefs=useRef({}) */

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

  const handlePlay = audio => {
    if (currentAudio && currentAudio !== audio) {
      /* const prevAudio = audioRefs.current[currentAudio];
         if (prevAudio) {
            prevAudio.pause();
        } */
      currentAudio.pause()
    }
    setCurrentAudio(audio)
  }

  const renderSongs = () => (
    <ul>
      {songsData.map(eachAudio => (
        <li key={eachAudio.id}>
          <p>{eachAudio.title}</p>
          <audio
            /* ref={(el)=>(audioRefs.current[eachAudio.id]=el)} here ref attribute is fun. 
            that called the dom element as an argument as el */
            controls
            onPlay={() => handlePlay(document.getElementById(eachAudio.id))}
            id={eachAudio.id}
          >
            <source src={eachAudio.audioUrl} type="audio/mp3" />
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
