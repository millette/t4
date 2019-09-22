// npm
import Router from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const EdPage = ({ MDXContent, page }) => {
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
        if (json && json.ok) Router.push(`/custom/${page}`)
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
      <form method="post" action={`/api/ed/${page}`} onSubmit={handleSubmit}>
        <textarea
          rows={MDXContent.split("\n").length + 3}
          cols="72"
          name="cnt"
          defaultValue={MDXContent}
        />
        <br />
        <button>Save</button>
      </form>
    </div>
  )
}

EdPage.propTypes = {
  MDXContent: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
}

EdPage.getInitialProps = async (o) => {
  const {
    req,
    query: { page },
  } = o
  console.log(!req, typeof req)
  const res = await fetch(`http://localhost:3000/${page}.mdx`)
  const c = await res.text()
  return { MDXContent: c, page }
}

export default EdPage
