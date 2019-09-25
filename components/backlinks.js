// npm
// import { useState, useEffect } from "react"
// import PropTypes from "prop-types"
import { useRouter } from "next/router"
// import "isomorphic-unfetch"

const Backlinks = (props) => {
  const router = useRouter()

  /*
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    // setInterval(() => setT1(Date.now()), interval)
  }, [])
  */

  return (
    <div>
      <h3>props</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <h3>router</h3>
      <pre>{JSON.stringify(router, null, 2)}</pre>
    </div>
  )
}

Backlinks.propTypes = {
  // kind: PropTypes.string,
}

export default Backlinks
