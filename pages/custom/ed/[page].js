// npm
import Error from "next/error"
import Router from "next/router"
import Link from "next/link"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const CustomEditPage = ({ MDXContent, page, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

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
  console.log(!req, typeof req)
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
