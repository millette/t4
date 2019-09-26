// npm
import Link from "next/link"

const FrontPage = () => (
  <div>
    <p>
      <Link href="/p2">
        <a>Static Page 2</a>
      </Link>
    </p>
    <p>
      <Link href="/custom/[page]" as="/custom/demo-entry">
        <a>Entrez dans la démo</a>
      </Link>{" "}
      ou{" "}
      <Link href="/custom/[page]" as="/custom/front-t4">
        <a>voyez un début de réplique du wiki de tournemain sur github</a>
      </Link>
      .
    </p>
  </div>
)

export default FrontPage
