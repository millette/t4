// npm
import Router from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const EdPage = ({ MDXContent }) => {
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const cnt = new window.FormData(ev.target).get("cnt")
    fetch(ev.target.getAttribute("action"), {
      headers: {
        "content-type": "application/json",
      },
      method: ev.target.getAttribute("method"),
      body: JSON.stringify({ cnt }),
    })
      .then((res) => res.ok && res.json())
      .then((json) => {
        console.log("json", json)
        if (json && json.ok) Router.push("/")
      })
      .catch(console.error)
  }
  return (
    <div>
      <p>
        Hello{" "}
        <Link href="/">
          <a>Top</a>
        </Link>
      </p>
      <form method="post" action="/api/c1" onSubmit={handleSubmit}>
        <textarea name="cnt" defaultValue={MDXContent} />
        <button>Save</button>
      </form>
    </div>
  )
}

EdPage.propTypes = {
  MDXContent: PropTypes.string.isRequired,
}

EdPage.getInitialProps = async ({ req }) => {
  console.log(!req, typeof req)
  const res = await fetch("http://localhost:3000/c1.mdx")
  const c = await res.text()
  return { MDXContent: c }
}

export default EdPage
