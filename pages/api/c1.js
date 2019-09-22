// core
import fs from "fs"

export default ({ method, body }, res) => {
  if (method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed", method })
  fs.writeFile("public/c1.mdx", body.cnt, "utf8", (error, a) => {
    if (error) return res.status(500).json({ error })
    res.status(200).json({ ok: true, title: "Next.js", a })
  })
}
