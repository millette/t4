// core
import { open, writeFile, createReadStream } from "fs"
import { pipeline } from "stream"

const ApiCustomPage = ({ method, body, query: { page } }, res) => {
  if (method !== "POST" && method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed", method })
  if (method === "GET") {
    open(`docs/custom/${page}.mdx`, (error, fd) => {
      if (error)
        return res
          .status(error.code === "ENOENT" ? 404 : 500)
          .json({ ...error, message: error.message })
      res.setHeader("Content-Type", "text/plain; charset=utf-8") // text/mdx is the official mime type
      pipeline(
        createReadStream("", { encoding: "utf8", fd }),
        res,
        (error) =>
          error && res.status(500).json({ ...error, message: error.message })
      )
    })
  } else {
    const { cnt } = body
    writeFile(`docs/custom/${page}.mdx`, cnt, "utf8", (error) => {
      if (error)
        return res.status(500).json({ ...error, message: error.message })
      res.json({ ok: true, size: cnt.length })
    })
  }
}

export default ApiCustomPage
