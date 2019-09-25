// npm
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import AU from "ansi_up"

const ansi_up = new AU()

// <pre>{JSON.stringify(error, null, 2)}</pre>

const MyError = ({ statusCode, error, m2, page }) => {
  const router = useRouter()
  if (router.pathname === "/custom/[page]" && router.query.page)
    page = router.query.page

  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      {m2 && (
        <pre
          style={{ padding: "2rem", background: "black", color: "white" }}
          dangerouslySetInnerHTML={{ __html: m2 }}
        />
      )}
      {page && error && error.code === "BABEL_PARSE_ERROR" && (
        <div>
          <Link href="/custom/ed/[page]" as={`/custom/ed/${page}`}>
            <a>Edit {page}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

MyError.getInitialProps = (o) => {
  const { res, err, asPath } = o
  const statusCode = res ? res.statusCode : err ? err.statusCode : null
  const m2 = err && ansi_up.ansi_to_html(err.toString())
  const page = asPath && !asPath.indexOf("/custom/") && asPath.slice(8)
  return { page, statusCode, error: err, m2 }
}

export default MyError
