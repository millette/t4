const watch = require("node-watch")

const changes = (em) => {
  watch("docs/custom", (evt, name) => {
    if (name.split(".").slice(-1)[0] === "mdx")
      em.emit("recent-changes", {
        evt,
        name: name.slice(12, -4),
        date: new Date().toISOString(),
      })
  })
}

module.exports = changes
