// npm
import Link from "next/link"

const CustomPages = ({ pages }) => () => (
  <div>
    <h3>List of Custom Pages</h3>
    <ul>
      {pages &&
        pages.length > 0 &&
        pages.map(({ source, href }) => (
          <li key={source}>
            <Link href="/custom/[page]" as={href}>
              <a>{source}</a>
            </Link>
          </li>
        ))}
    </ul>
  </div>
)

export default CustomPages
