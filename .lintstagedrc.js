"use strict"

const quote = (f) => `'${f.replace(/\[/g, "\\[").replace(/\]/g, "\\]")}'`

module.exports = {
  "*.{js,json,md,mdx}": (filenames) => {
    return filenames.reduce((commands, filename) => {
      const fn = quote(filename)
      return [...commands, `prettier --write ${fn}`, `git add ${fn}`]
    }, [])
  },
}
