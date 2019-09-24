// npm
import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const interval = 1000

const Clock = ({ kind }) => {
  const now = Date.now()
  const [t1, setT1] = useState(now)
  const [t2, setT2] = useState(now)
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    setInterval(() => setT1(Date.now()), interval)
    setInterval(() => setT2((x) => x + interval), interval)
  }, [])

  useEffect(() => setDiff(t2 - t1), [t1, t2])

  return (
    <div>
      <h3>I am a {kind || ""} clock</h3>
      <div>Correct: {new Date(t1).toISOString().slice(0, -5)}</div>
      <div>Buggy: {new Date(t2).toISOString().slice(0, -5)}</div>
      <div>diff: {diff}</div>
    </div>
  )
}

Clock.propTypes = {
  kind: PropTypes.string,
}

export default Clock
