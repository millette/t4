// npm
import LinkNextjs from "next/link"
import App from "next/app"
import { MDXProvider } from "@mdx-js/react"
import { ThemeProvider, Styled, ColorMode } from "theme-ui"
import { toTheme } from "@theme-ui/typography"
import typoTheme from "typography-theme-wikipedia"
import { Heading, Text, Box, Link } from "rebass"
import PropTypes from "prop-types"

const theme = toTheme(typoTheme)

const HeHa = () => <p>Heeeeeha</p>

const h1 = ({ children }) => (
  <Heading as="h1" my={2} fontSize={5}>
    {children}
  </Heading>
)

h1.propTypes = {
  children: PropTypes.node.isRequired,
}

const h2 = ({ children }) => (
  <Heading as="h2" my={2} fontSize={4}>
    {children}
  </Heading>
)

h2.propTypes = {
  children: PropTypes.node.isRequired,
}

const h3 = ({ children }) => (
  <Heading as="h3" my={2} fontSize={3}>
    {children}
  </Heading>
)

h3.propTypes = {
  children: PropTypes.node.isRequired,
}

const h4 = ({ children }) => (
  <Heading as="h4" my={2} fontSize={3}>
    {children}
  </Heading>
)

h4.propTypes = {
  children: PropTypes.node.isRequired,
}

const p = ({ children }) => (
  <Text my={2}>
    <p>{children}</p>
  </Text>
)

p.propTypes = {
  children: PropTypes.node.isRequired,
}

const a = ({ href, children }) =>
  href.indexOf("://") === -1 ? (
    <LinkNextjs href={href} passHref>
      <Link>{children}</Link>
    </LinkNextjs>
  ) : (
    <Link target="_blank" rel="noopener noreferrer" href={href}>
      <sup>⧉</sup>&nbsp;{children}
    </Link>
  )

a.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const components = {
  HeHa,
  h1,
  h2,
  h3,
  h4,
  p,
  a,
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    // const nav = this.props.router.pathname !== "/" && <Nav />
    return (
      <ThemeProvider theme={theme}>
        <ColorMode />
        <Styled.root>
          <MDXProvider components={components}>
            <Box mx={5}>
              <Component {...pageProps} />
            </Box>
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp
