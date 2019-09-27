// npm
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import "isomorphic-unfetch"

const Backlinks = ({ of }) => {
  const {
    query: { page },
  } = useRouter()
  const [backlinks, setBacklinks] = useState()

  useEffect(() => {
    fetch(`/api/backlinks/${of || page}`).then(async (res) => {
      if (!res.ok) return setBacklinks([])
      const j = await res.json()
      setBacklinks(j)
    })
  }, [])

  return (
    <div>
      <h3>Pages linking {of ? `to ${of}` : "here"}</h3>
      {backlinks ? (
        <ul>
          {backlinks.map((b) => (
            <li key={b.from}>
              <Link href="/custom/[page]" as={`/custom/${b.from}`}>
                <a>{b.from}</a>
              </Link>{" "}
              with text <b>{b.text}</b>{" "}
              {b.title && (
                <>
                  {" "}
                  and title <i>{b.title}</i>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading backlinks...</div>
      )}
    </div>
  )
}

Backlinks.tournemain = {
  description: "Lists pages linking back to the current page.",
}

export default Backlinks
