import Link from "next/link"

const Page2 = () => (
  <div>
    <h3>Page 2</h3>
    <p>
      Hello{" "}
      <Link href="/">
        <a>Top</a>
      </Link>
    </p>
  </div>
)

export default Page2
