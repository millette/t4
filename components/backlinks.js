// npm
import { useState, useEffect } from "react"
// import PropTypes from "prop-types"
import { useRouter } from "next/router"
import "isomorphic-unfetch"

const Backlinks = (props) => {
  const router = useRouter()

  const [diff, setDiff] = useState()

  useEffect(() => {
    if (!router.query.page) return
    fetch(`/api/backlinks/${router.query.page}`).then(async (res) => {
      if (!res.ok) return
      const j = await res.json()
      setDiff(j)
    })
  }, [])

  /*
  <h3>props</h3>
  <pre>{JSON.stringify(props, null, 2)}</pre>
  <h3>router</h3>
  <pre>{JSON.stringify(router, null, 2)}</pre>
  */

  return (
    <div>
      <h3>diff</h3>
      {diff ? (
        <pre>{JSON.stringify(diff, null, 2)}</pre>
      ) : (
        <div>Loading backlinks...</div>
      )}
    </div>
  )
}

Backlinks.propTypes = {
  // kind: PropTypes.string,
}

export default Backlinks
