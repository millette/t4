// npm
import Link from "next/link"
import Router from "next/router"
// import LinkNextjs from "next/link"
import { Fragment, useState, useEffect } from "react"
import MDXRuntime from "@mdx-js/runtime"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
// import { Link } from "rebass"
// import { Button, Link as LinkR } from "rebass"
import { Button, Flex, Box } from "rebass"
import "isomorphic-unfetch"

// self
import ErrorPage from "../_error"
import { CustomPagesFactory, Clock, Backlinks } from "../../components"

const AnError = ({ statusCode, page }) => {
  if (statusCode !== 404) return <ErrorPage statusCode={statusCode} />
  return (
    <div>
      <code>{page}</code> does not exist.{" "}
      <Link href="/custom/ed/[page]" as={`/custom/ed/${page}`} passHref>
        <Button color="primary" bg="orange" as="a">
          Create it?
        </Button>
      </Link>
    </div>
  )
}

AnError.propTypes = {
  statusCode: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
}

const CustomPage = ({ MDXContent, page, pages, errorCode }) => {
  const [mostRecentChange, setMostRecentChange] = useState()
  const [recentChanges, setRecentChanges] = useState([])
  const [mostRecentChange2, setMostRecentChange2] = useState()
  // const [recentChanges2, setRecentChanges2] = useState()

  useEffect(() => {
    const src = new window.EventSource("/api/sse/changes")
    src.onerror = (e) => console.log("ouille", e)
    // src.onopen = (e) => console.log("OPEN", e)
    src.onmessage = (e) => {
      const d = JSON.parse(e.data)
      setMostRecentChange(d)
    }

    const src2 = new window.EventSource("/api/sse/nav")
    src2.onerror = (e) => console.log("ouille", e)
    // src.onopen = (e) => console.log("OPEN", e)
    src2.onmessage = ({ data }) => {
      // const d = JSON.parse(e.data)
      // console.log('DDD-typeof', typeof d)
      // console.log('DDD', d)
      const elU = `/custom/${data}`
      setMostRecentChange2(elU)
      Router.push("/custom/[page]", elU)
      setTimeout(() => {
        setMostRecentChange2()
      }, 1000)
    }

    return () => {
      if (src) {
        src.onmessage = undefined
        src.close()
      }
      if (src2) {
        src2.onmessage = undefined
        src2.close()
      }
    }
  }, [])

  useEffect(() => {
    if (!mostRecentChange) return
    const c = recentChanges.slice()
    c.unshift(mostRecentChange)
    if (c.length <= 5) setRecentChanges(c)
    else setRecentChanges(c.slice(0, 5))

    /*
      setRecentChanges((c) => {
        c.unshift(mostRecentChange)
        if (c.length > 5) c.pop()
        return c
      })
      */
  }, [mostRecentChange])

  /*
  useEffect(() => {
    if (!mostRecentChange2) return
    setRecentChanges2(mostRecentChange2)
  }, [mostRecentChange2])
  */

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

  const CustomPages = CustomPagesFactory(pages || [])

  Flex.tournemain = { description: "Responsive flexbox layout component" }
  Box.tournemain = { description: "Responsive box-model layout component" }

  const components = {
    Flex,
    Box,
    CustomPages,
    Clock,
    a,
    Backlinks,
  }

  const CustomTags = () => (
    <dl>
      {Object.keys(components).map((tag) => {
        if (
          !components[tag].tournemain ||
          !components[tag].tournemain.description
        )
          return
        return (
          <Fragment key={tag}>
            <dt>
              <code>&lt;{tag} /&gt;</code>
            </dt>
            <dd>{components[tag].tournemain.description}</dd>

            {tag !== "CustomTags" && (
              <dd>
                <details>
                  <summary>Démo</summary>
                  {tag === "Clock" ? (
                    <Clock />
                  ) : tag === "CustomPages" ? (
                    <CustomPages />
                  ) : tag === "Backlinks" ? (
                    <Backlinks />
                  ) : (
                    <i>Not here</i>
                  )}
                </details>
              </dd>
            )}
          </Fragment>
        )
      })}
    </dl>
  )

  CustomTags.tournemain = { description: "Lists all available custom tags." }

  components.CustomTags = CustomTags

  // sound from https://freesound.org/people/Mafon2/sounds/371270/

  return (
    <MDXProvider components={components}>
      <div>
        <p>
          <Link href="/">
            <a>Site frontpage</a>
          </Link>
        </p>
        {mostRecentChange2 && (
          <p>
            <audio autoPlay src="/static/drip.opus" />
            One moment, navigating to <code>{mostRecentChange2}</code>...
          </p>
        )}

        {recentChanges.length > 0 && (
          <ol>
            {recentChanges.map(({ evt, name, date }) => (
              <li key={date}>
                {new Date(date).toLocaleString()}:{" "}
                <Link href="/custom/[page]" as={`/custom/${name}`}>
                  <a>{name}</a>
                </Link>{" "}
                (<i>{evt}</i>)
              </li>
            ))}
          </ol>
        )}
        <MDXRuntime>{MDXContent}</MDXRuntime>
        <p>
          <Link href="/custom/ed/[page]" as={`/custom/ed/${page}`} passHref>
            <Button color="primary" bg="green" as="a">
              Edit
            </Button>
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
  pages: PropTypes.array, // .isRequired,
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
