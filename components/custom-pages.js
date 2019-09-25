// npm
import "isomorphic-unfetch"
import { useState, useEffect } from "react"

const CustomPages = () => {
  const [pages, setPages] = useState([])

  useEffect(async () => {
    const res2 = await fetch(`http://localhost:3000/api/customs`)
    const pages = await res2.json()
    setPages(pages)
  }, [])

  return (
    <div>
      <h3>List of Custom Pages</h3>
      <pre>{JSON.stringify(pages, null, 2)}</pre>
    </div>
  )
}

/*
CustomPages.getInitialProps = async () => {
  const res2 = await fetch(`http://localhost:3000/api/customs`)
  const pages = await res2.json()
  return { pages }
}
*/
export default CustomPages
