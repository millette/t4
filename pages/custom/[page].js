// npm
import Link from "next/link"
import { Fragment } from "react"
import MDXRuntime from "@mdx-js/runtime"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import "isomorphic-unfetch"

// self
import ErrorPage from "../_error"
import { CustomPagesFactory, Clock, Backlinks } from "../../components"

const AnError = ({ statusCode, page }) => {
  if (statusCode !== 404) return <ErrorPage statusCode={statusCode} />
  return (
    <div>
      <code>{page}</code> does not exist.{" "}
      <Link href="/custom/ed/[page]" as={`/custom/ed/${page}`}>
        <a>Create it?</a>
      </Link>
    </div>
  )
}

AnError.propTypes = {
  statusCode: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
}

const CustomPage = ({ MDXContent, page, pages, errorCode }) => {
  if (errorCode) return <AnError page={page} statusCode={errorCode} />

  const a = ({ href, children }) => {
    if (href.indexOf("://") !== -1) {
      return (
        <a target="_blank" rel="noopener noreferrer" href={href}>
          <sup>⧉</sup>&nbsp;{children}
        </a>
      )
    }

    if (href.indexOf("/custom/"))
      return (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      )

    return (
      <Link as={href} href="/custom/[page]">
        <a>{children}</a>
      </Link>
    )
  }

  a.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  const components = {
    CustomPages: CustomPagesFactory(pages),
    Clock,
    a,
    Backlinks,
  }

  const CustomTags = () => (
    <dl>
      {Object.keys(components).map(
        (tag) =>
          components[tag].tournemain &&
          components[tag].tournemain.description && (
            <Fragment key={tag}>
              <dt>
                <code>&lt;{tag} /&gt;</code>
              </dt>
              <dd>{components[tag].tournemain.description}</dd>
            </Fragment>
          )
      )}
    </dl>
  )

  CustomTags.tournemain = { description: "Lists all available custom tags." }

  components.CustomTags = CustomTags

  return (
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
          <Link href="/custom/ed/[page]" as={`/custom/ed/${page}`}>
            <a>Edit</a>
          </Link>
        </p>
      </div>
    </MDXProvider>
  )
}

CustomPage.propTypes = {
  MDXContent: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  errorCode: PropTypes.number,
  pages: PropTypes.array.isRequired,
}

CustomPage.getInitialProps = async (o) => {
  const {
    req,
    res,
    query: { page },
  } = o
  // FIXME: guard against system pages: custom, ed, etc.

  const urlBase = req ? `http://${req.headers.host}` : ""
  const res2 = await fetch(`${urlBase}/api/ed/${page}`)
  if (res2.ok) {
    const MDXContent = await res2.text()
    const res3 = await fetch(`${urlBase}/api/customs`)
    const pagesO = await res3.json()
    return { MDXContent, page, pages: pagesO.ok && pagesO.pages }
  }

  if (res2.status === 404) {
    if (res) res.statusCode = 404
    return {
      errorCode: 404,
      MDXContent: "",
      page,
    }
  }
  if (res) res.statusCode = 500
  return {
    errorCode: 500,
    MDXContent: "",
    page,
  }
}

export default CustomPage
