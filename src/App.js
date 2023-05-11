import './App.css';
import {useState, useRef, useEffect} from "react"

const time = 5
function App() {
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(time)
  const [gameStarted, setGameStarted] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const inputRef = useRef(null)


  const handleChange = (e) => {
    const {value} = e.target
    setText(value)
  }

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true)
      setText("")
      setTimeRemaining(time)
      setWordCount(0)
      inputRef.current.disabled = false
      inputRef.current.focus()
    } 
  }

  const counter = () => {
    const words = text.trim().split(' ')
    const wordsSplit = words.filter(word=>word !== '').length
    setWordCount(wordsSplit)
  }

  const endGame = () => {
    setGameStarted(false)
    counter()
  }
  
  useEffect(()=>{
    if (timeRemaining > 0 && gameStarted){
      setTimeout(()=>{setTimeRemaining(prevValue=>prevValue-1)}, 1000)
    } else if (timeRemaining === 0){
      endGame()
    }
  },[timeRemaining, gameStarted])


  return (
    <div className="App">
       <h1>Word Count Game</h1>
      <textarea 
      disabled={!gameStarted} 
      value={text} 
      ref={inputRef}
      onChange={handleChange} />
      <h1>Time Remaining: {timeRemaining}</h1>
      <button onClick={startGame} disabled={gameStarted}>Start Game</button>
      <h1>Word count {wordCount}</h1>
    </div>
  );
}

export default App;
