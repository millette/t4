import Link from 'next/link'
import 'isomorphic-unfetch'
import MDX from 'mdx-runtime-slim'
import { MDXProvider } from '@mdx-js/react'

const FrontPage = ({ MDXContent }) => (
  <MDXProvider>
    <div>
      <p>Hello <Link href="/p2"><a>Earth</a></Link></p>
      <MDX>{MDXContent}</MDX>
    </div>
  </MDXProvider>
)

FrontPage.getInitialProps = async ({ req }) => {
  // console.log('FrontPage.getInitialProps') // , a, b, c)
  const res = await fetch('http://localhost:3000/c1.txt')
  const c = await res.text()
  // console.log('CCC', c)
  // return { MDXContent: '### more stuff' }
  return { MDXContent: c }
}

export default FrontPage
 
