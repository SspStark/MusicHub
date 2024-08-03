import {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import MusicHubContext from '../../context/MusicHubContext'
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'

import {
  HomeBg,
  HomeHeading,
  LoadingText,
  AudioTitle,
  Artist,
} from './styledComponents'
import './style.css'

const Home = () => {
  const [songsData, setSongsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentAudio, setCurrentAudio] = useState(null)
  const {isThemeDark} = useContext(MusicHubContext)

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
    audio.play() // Start playing the current audio

    // Set up the onEnded event to play the next audio
    audio.addEventListener('ended', handleEnded)
  }

  const handleEnded = () => {
    // Find the index of the current audio in the songsData array
    const currentIndex = songsData.findIndex(
      audio => audio.id === currentAudio.id,
    )

    // Calculate the index of the next audio
    const nextIndex = (currentIndex + 1) % songsData.length

    // Get the next audio element
    const nextAudio = document.getElementById(songsData[nextIndex].id)

    // Remove the onEnded event listener from the current audio
    currentAudio.removeEventListener('ended', handleEnded)

    // Play the next audio if it exists, otherwise, reset to the first audio
    if (nextAudio) {
      setCurrentAudio(nextAudio)
      nextAudio.play()
      nextAudio.addEventListener('ended', handleEnded)
    } else {
      // If there is no next audio, reset to the first audio
      const firstAudio = document.getElementById(songsData[0].id)
      setCurrentAudio(firstAudio)
      firstAudio.play()
      firstAudio.addEventListener('ended', handleEnded)
    }
  }

  const renderSongs = () => (
    <ul className="music-list">
      {songsData.map(eachAudio => (
        <li key={eachAudio.id} loading="lazy">
          <img
            src={eachAudio.image_url}
            alt={eachAudio.title}
            className="audio-image"
          />
          <AudioTitle theme={isThemeDark}>{eachAudio.title}</AudioTitle>
          <Artist>{eachAudio.artist}</Artist>
          <audio
            /* ref={(el)=>(audioRefs.current[eachAudio.id]=el)} here ref attribute is fun. 
            that called the dom element as an argument as el */
            controls
            onPlay={() => handlePlay(document.getElementById(eachAudio.id))}
            id={eachAudio.id}
            className="audio-element"
          >
            <source src={eachAudio.audioUrl} type="audio/mp3" />
          </audio>
        </li>
      ))}
    </ul>
  )

  return (
    <HomeBg theme={isThemeDark}>
      <HomeHeading theme={isThemeDark}>Welcome to MusicHub</HomeHeading>
      {isLoading ? (
        <div className="loader-container">
          {Array.from({length: 5}).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
          <LoadingText theme={isThemeDark}>Loading . . .</LoadingText>
        </div>
      ) : (
        renderSongs()
      )}
    </HomeBg>
  )
}

export default Home
