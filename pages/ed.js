import Link from "next/link"
import "isomorphic-unfetch"

const EdPage = ({ MDXContent }) => {
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const d = new window.FormData(ev.target).get("cnt")
    console.log("DD", d)
  }
  return (
    <div>
      <p>
        Hello{" "}
        <Link href="/">
          <a>Top</a>
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <textarea name="cnt" defaultValue={MDXContent} />
        <button>Save</button>
      </form>
    </div>
  )
}

EdPage.getInitialProps = async ({ req }) => {
  console.log(!req, typeof req)
  const res = await fetch("http://localhost:3000/c1.mdx")
  const c = await res.text()
  return { MDXContent: c }
}

export default EdPage
