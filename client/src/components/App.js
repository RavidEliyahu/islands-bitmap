import React, { useState, useEffect, useRef } from 'react'
import Map from './Map'
import "../css/App.css"
import axios from 'axios'

function App() {
  // server paths
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const DOCKER_URL = process.env.REACT_APP_DOCKER_URL

  // loading & error handling
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // show buttons states
  const [showRandom, setShowRandom] = useState(true)
  const [showSolve, setShowSolve] = useState(false)
  const [showRestart, setShowRestart] = useState(false)

  // matrix output variables
  const [mat, setMat] = useState([])
  const [size, setSize] = useState({ n: 0, m: 0})
  const [islands, setIslands] = useState(0)

  // input
  const bitmapInputRef = useRef()

  // state managers
  const [state, setState] = useState('randomize')
  const [action, setAction] = useState({})

  /**
   * This use effect update the matrix state
   * when action changes.
   */
  useEffect(() => {
    async function fetchAPI() {
      try {
        const res = await axios(action)
        setMat(res.data.mat)
        if ("numOfIslands" in res.data) setIslands(res.data.numOfIslands)
      } catch (e) {
        setMat([])
        setError("Ops.. Something went wrong!")
        console.error(e)
      }
      setLoading(false);
    }
    if (action.data)
      fetchAPI()
  }, [action])

  /**
   * This function handles the
   * on click event of the randomize button.
   */
  function handleRandomize() {
    try {
      const [n, m] = (bitmapInputRef.current.value)
        .replace(/\s/g, '')
        .split(",")
        .map(Number)

      if (validateInput(n, m))
      {
        setError("") // no errors on input
        setSize({n, m})
        setState("randomize")
        setLoading(true);
        setAction({
          method: 'POST',
          url: `${ DOCKER_URL || BASE_URL }/randomize`,
          headers: { "Content-Type": "application/json" },
          data: { n, m }
        })

        // switch button states
        setShowRandom(false);
        setShowSolve(true);
      } else {
        setError("Invalid input!!!!")
        setTimeout(() => setError(""), 2000)
      }
    } catch (e) {
      setError("Ops.. Something went wrong!")
      console.error(e)
    }
  }

  function handleDraw() {
    const [n, m] = (bitmapInputRef.current.value)
        .replace(/\s/g, '')
        .split(",")
        .map(Number)

    if (validateInput(n, m))
    {
      setLoading(true);
      setError("") // no errors on input
      setState("draw")
      setSize({n, m})
      let arr = new Array(n);
      for (let i = 0; i < n; i++) {
        arr[i] = new Array(m);
        for (let j = 0; j < m; j++) {
          arr[i][j] = 255;
        }
      }
      setMat(arr);
      setShowRandom(false);
      setShowSolve(true);
    } else {
      setError("Invalid input!!!!")
      setTimeout(() => setError(""), 2000)
    }
    setTimeout(() => setLoading(false))
  }

  /**
   * This function validates user input.
   * @param {Number} weight - matrix weight
   * @param {Number} height - matrix height
   * @returns {Boolean} - height & weight are valid inputs.
   */
  function validateInput(weight, height) {
    if (weight && height && Number.isInteger(weight) &&
    weight > 0 && Number.isInteger(height) &&
    height > 0 && height <= 1000 && weight <= 1000)
      return true
    return false
  }

  /**
   * This function handles the
   * onclick event of the solve button.
   */
  function handleSolve() {
    setState("solve")
    setLoading(true)
    setAction({
      method: 'POST',
      url: `${ DOCKER_URL || BASE_URL }/solve`,
      headers: { "Content-Type": "application/json" },
      data: { mat, n: size.n, m: size.m }
    })

    // switch buttons
    setShowSolve(false)
    setShowRestart(true)
  }

  /**
   * This function returns the app to its
   * first state.
   */
  function handleRestart() {
    setLoading(true)
    setState("restart")
    setMat([])
    setSize({ n: 0, m: 0 })
    setShowRestart(false)
    setShowRandom(true)
    setTimeout(() => setLoading(false))
  }

  if (loading) return (<p className="center">"Loading..."</p>)

  return (
    <>
      <div className="center">
        <p>
          {
          showRandom ?
          "Please enter bitmap size:" :
          `${size.n} X ${size.m}`
          }
        </p>
        {
          mat.length > 0 ? <Map mat={mat} size={size} state={state}></Map> : null
        }
        {
          showRestart ?
          <p>
            { `FOUND ${ islands } ISLAND${ islands > 1 ? "S" : "" }!` }
          </p> : <p/>
        }
        <div className="center">
          { showRandom ?
            <input
              className="app-input"
              ref={ bitmapInputRef }
              type="text" id="bitmap_input"
              placeholder="Bitmap size: n, m"
            /> : null
          }
        </div>
        <div className="center">
          <div>
            {
              showRandom ?
              <button
                className="app-btn"
                type="button"
                onClick={handleRandomize}
              >
                RANDOMIZE
              </button> : null
            }
          </div>
          <div>
            {
              showRandom ?
              <button
                className="app-btn"
                type="button"
                onClick={handleDraw}
              >
                DRAW
              </button> : null
            }
          </div>
          {
            showSolve ?
            <button
              className="app-btn"
              type="button" onClick={handleSolve}
            >
              SOLVE
            </button> : null
          }
          {
            showRestart ?
            <button
              className="app-btn"
              type="button"
              onClick={handleRestart}
            >
              RESTART
            </button> : null
          }
          {
            error ? <p className="error">{ error }</p> : null
          }
        </div>
      </div>
    </>
  )
}

export default App
