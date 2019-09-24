// core
import fs from "fs"

const ApiC1 = ({ method, body, query: { page } }, res) => {
  if (method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed", method })
  const { cnt } = body
  fs.writeFile(`public/custom/${page}.mdx`, cnt, "utf8", (error) => {
    if (error) return res.status(500).json({ ...error, message: error.message })
    res.json({ ok: true, size: cnt.length })
  })
}

export default ApiC1
