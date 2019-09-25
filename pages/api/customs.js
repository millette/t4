// core
import { readdir } from "fs"

const isMdx = (source) => source.split(".").slice(-1)[0] === "mdx"

const output = (source) => ({
  source,
  href: `/custom/${source.slice(0, -4)}`,
})

const ApiCustoms = ({ method }, res) => {
  if (method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed", method })

  readdir("public/customs/", (error, files) => {
    if (error) return res.status(500).json({ error })
    res.json({ ok: true, pages: files.filter(isMdx).map(output) })
  })
}

export default ApiCustoms
