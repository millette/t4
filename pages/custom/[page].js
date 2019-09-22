import Link from "next/link"
import MDXRuntime from "mdx-runtime-slim"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const Clock = (props) => {
  return (
    <div>
      <h3>I am a {props.kind || ""} clock</h3>
    </div>
  )
}

const components = { Clock }

const FrontPage = ({ MDXContent }) => (
  <MDXProvider components={components}>
    <div>
      <p>
        Hello{" "}
        <Link href="/p2">
          <a>Earth</a>
        </Link>
      </p>
      <MDXRuntime>{MDXContent}</MDXRuntime>
      <p>
        <Link href="/ed">
          <a>Edit</a>
        </Link>
      </p>
    </div>
  </MDXProvider>
)

FrontPage.propTypes = {
  MDXContent: PropTypes.string.isRequired,
}

FrontPage.getInitialProps = async (o) => {
  const {
    req,
    query: { page },
  } = o
  console.log(!req, typeof req, page)
  const res = await fetch(`http://localhost:3000/${page}.mdx`)
  const c = await res.text()
  return { MDXContent: c }
}

export default FrontPage
