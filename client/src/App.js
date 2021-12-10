import React, { useState, useEffect, useRef } from 'react'
import Map from './Map'
import "./App.css"
import axios from 'axios'

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const DOCKER_URL = process.env.REACT_APP_DOCKER_URL
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRandom, setShowRandom] = useState(true)
  const [showSolve, setShowSolve] = useState(false)
  const [showRestart, setShowRestart] = useState(false)
  const [mat, setMat] = useState([])
  const [size, setSize] = useState({ n: 0, m: 0})
  const [islands, setIslands] = useState(0)
  const bitmapInputRef = useRef()
  const [state, setState] = useState('randomize')
  const [action, setAction] = useState({})

  useEffect(() => {
    if (action.data)
      axios(action)
      .then((res) => {
        setMat(res.data.mat)
        if ("numOfIslands" in res.data) setIslands(res.data.numOfIslands)
        setLoading(false);
      })
  }, [action])

  function handleRandomize(e) {
    try {
      setState("randomize")
      const [n, m] = (bitmapInputRef.current.value).replace(/\s/g, '').split(",").map(Number);
      if (n && m && Number.isInteger(n) &&
          n > 0 && Number.isInteger(m) &&
          m > 0 && m <= 1000 && n <= 1000)
      {
        setError("")
        setSize(prevState => { return {n, m} })
        setAction({
          method: 'POST',
          url: `${ DOCKER_URL || BASE_URL }/randomize`,
          headers: { "Content-Type": "application/json" },
          data: { n, m }
        })
        setLoading(true);

        // switch buttons
        setShowRandom(false);
        setShowSolve(true);
      } else {
        setError("Invalid input!!!!")
      }
    } catch (e) {
      console.error(e)
    }
  }

  function handleSolve(e) {
    setState("solve")
    setAction({
      method: 'POST',
      url: `${ DOCKER_URL || BASE_URL }/solve`,
      headers: { "Content-Type": "application/json" },
      data: { mat, n: size.n, m: size.m }
    })
    setLoading(true)

    // switch buttons
    setShowSolve(false)
    setShowRestart(true)
  }

  function handleRestart(e) {
    setState("restart")
    setShowRestart(false)
    setMat([])
    setSize({ n: 0, m: 0})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    })
    setShowRandom(true)
  }

  if (loading) return (<div className="center">"Loading.."</div>)

  return (
    <>
      <div className="center">
        <p>{ showRandom ? "Please enter bitmap size:" : `${size.n} X ${size.m}`}</p>
        {
          <Map mat={mat} size={size} state={state}></Map>
        }
        {
          showRestart ? `FOUND ${ islands } ISLAND${ islands > 1 ? "S" : "" }!` : null
        }
        <div className="center">
        { showRandom ?
          <input ref={bitmapInputRef} type="text" id="bitmap_input" placeholder="Bitmap size: n, m"/> :
          null
        }
        </div>
        <div className="center">
          { showRandom ?
            <button type="button" onClick={handleRandomize}>RANDOMIZE</button> :
            <></>
          }
          { showSolve ?
          <button type="button" onClick={handleSolve}>SOLVE</button> :
          <></>
          }
          { showRestart ?
          <button type="button" onClick={handleRestart}>RESTART</button> :
          <></>
          }
          {
            error ? <h4 className="error">{ error }</h4> : <></>
          }
        </div>
      </div>
    </>
  )
}

export default App
