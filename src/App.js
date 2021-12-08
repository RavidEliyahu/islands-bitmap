import React, { useState, useEffect, useRef } from 'react'
import Map from './Map'
import "./App.css"
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [mat, setMat] = useState([])
  const [size, setSize] = useState({ n: 0, m: 0})
  const bitmapInputRef = useRef()


  useEffect(() => {
    const {n, m} = size;
    axios({
      method: 'POST',
      url: `https://islands-bitmap-server.herokuapp.com/randomize`,
      headers: { "Content-Type": "application/json" },
      data: {n, m}
    })
    .then((res) => {
      setMat(res.data.mat)
      console.log(res.data)
      setLoading(false);
    })
  }, [size, loading])

  function handleRandomize(e) {
    const [n, m] = (bitmapInputRef.current.value).split(", ").map(Number);
    setSize(prevState => { return {n, m} })
    setLoading(true);
  }

  function handleSolve(e) {
    setLoading(true);
  }

  if (loading) return "Loading.."

  return (
    <>
      <div className="center">
        <p>Please enter bitmap size:</p>
        {
          (size.n > 0 && size.m > 0 && !loading) ? <Map mat={mat} size={size}></Map> : <></>
        }
        <form>
          <div>
            <input ref={bitmapInputRef} type="text" id="bitmap_input" placeholder="Bitmap size: n, m"/>
          </div>
          <div>
            <button type="button" onClick={handleRandomize}>RANDOMIZE</button>
          </div>
          <div>
            <button type="button" onClick={handleSolve}>SOLVE</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
