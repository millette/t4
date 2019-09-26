// npm
import Link from "next/link"

export default (pages) => {
  const CustomPages = () => (
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
  CustomPages.displayName = "custom-pages-component"
  CustomPages.tournemain = { description: "Lists all available custom pages." }
  return CustomPages
}
