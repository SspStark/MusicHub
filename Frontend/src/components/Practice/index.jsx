import {useState} from 'react'
import song1 from '../music/Bloody_Mary.mp3'
import song2 from '../music/Starboy.mp3'

const audioData = [
  {
    id: 1,
    title: 'Bloody Mary',
    audioFile: song1,
  },
  {
    id: 2,
    title: 'Starboy',
    audioFile: song2,
  },
]

const Practice = () => {
  const [currentSong, setCurrentSong] = useState(null)

  const handlePlay = audio => {
    if (currentSong && currentSong !== audio) {
      currentSong.pause()
    }
    setCurrentSong(audio)
  }

  return (
    <>
      <h1>Welcome to MusicHub</h1>
      <ul>
        {audioData.map(each => (
          <li key={each.id}>
            <p>{each.title}</p>
            <audio
              controls
              onPlay={() => handlePlay(document.getElementById(each.id))}
              id={each.id}
            >
              <source src={each.audioFile} type="audio/mp3" />
            </audio>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Practice
