// npm
import Link from "next/link"

const FrontPage = () => (
  <div>
    <p>
      Hello{" "}
      <Link href="/p2">
        <a>Earth</a>
      </Link>
    </p>
    <p>
      See{" "}
      <Link href="/custom/[page]" as="/custom/more">
        <a>more</a>
      </Link>
      .
    </p>
  </div>
)

export default FrontPage
