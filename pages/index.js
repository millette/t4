import Link from "next/link"
import MDXRuntime from "mdx-runtime-slim"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

const FrontPage = ({ MDXContent }) => (
  <MDXProvider>
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

FrontPage.getInitialProps = async ({ req }) => {
  console.log(!req, typeof req)
  const res = await fetch("http://localhost:3000/c1.mdx")
  const c = await res.text()
  return { MDXContent: c }
}

export default FrontPage
