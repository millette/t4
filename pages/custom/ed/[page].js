// npm
import ErrorPage from "next/error"
import Router from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const CustomEditPage = ({ MDXContent, page, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} />

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
        if (!json || !json.ok) {
          const err = new Error("Oupsy")
          err.json = json
          throw err
        }
        Router.push(`/custom/${page}`)
      })
      // FIXME: Show error to user
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
        <p>
          <button>Save</button>
        </p>
        <p>
          Note that only pages in <code>/custom/</code> can be edited and linked
          to.
        </p>
      </form>
    </div>
  )
}

CustomEditPage.propTypes = {
  MDXContent: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
}

CustomEditPage.getInitialProps = async (o) => {
  const {
    req,
    res,
    query: { page },
  } = o
  // FIXME: guard against system pages: custom, ed, etc.
  const res2 = await fetch(`http://localhost:3000/${page}.mdx`)
  if (res2.ok) {
    const c = await res2.text()
    return { MDXContent: c, page }
  }

  if (res2.status === 404) return { MDXContent: `# ${page}`, page }
  if (res) res.statusCode = 500
  return {
    errorCode: 500,
    MDXContent: "",
    page,
  }
}

export default CustomEditPage
