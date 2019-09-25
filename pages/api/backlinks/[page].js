// core
import { readFile, readdir } from "fs"

// npm
import remark from "remark"
import select from "unist-util-select"

const fix = ({ url, title, children }) => {
  if (url.indexOf("/custom/")) return false
  const obj = { page: url.slice(8) }
  if (title) obj.title = title
  const text = children[0] && children[0].type === "text" && children[0].value
  if (text) obj.text = text
  return obj
}

const getLinks = (from, cnt) => {
  const res = select
    .selectAll("link", remark.parse(cnt))
    .map(fix)
    .filter(Boolean)
  if (!res.length) return
  return res.map((x) => ({
    ...x,
    from,
  }))
}

const readFileP = (fn) =>
  new Promise((resolve, reject) => {
    readFile(`docs/custom/${fn}.mdx`, (err, cnt) => {
      if (err && err.code !== "ENOENT") return reject(err)
      if (!cnt) return resolve(false)
      resolve(getLinks(fn, cnt))
    })
  })

const isMdx = (source) => source.split(".").slice(-1)[0] === "mdx"

const output = (source) => source.slice(0, -4)
const notSelf = (p1) => (p2) => p1 !== p2

const ApiBacklinks = ({ method, query: { page } }, res) => {
  if (method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed", method })

  readdir("docs/custom/", (error, files) => {
    if (error) return res.status(500).json({ error })
    const pages = files
      .filter(isMdx)
      .map(output)
      .filter(notSelf(page))

    Promise.all(pages.map(readFileP)).then((x) => {
      const y = x.filter(Boolean)
      const z = [].concat(...y).filter(({ page: p }) => {
        return p === page
      })
      console.log("XXX", z)
      res.json(z)
    })
    /*
    // const cnt = readFileSync(`docs/custom/${page}.mdx`)
    readFile(`docs/custom/${page}.mdx`, (err, cnt) => {
      if (err) {
        console.log('ERR', err)
        return res.json([])
      }
      const lll = getLinks(cnt)
      res.json(lll)
    })
    */
  })
}

export default ApiBacklinks
