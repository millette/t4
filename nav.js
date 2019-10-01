const watch = require("node-watch")

const nav = (em) => {
  // console.log('NAV-SETUP')
  watch("navs", (evt, name) => {
    // console.log('NAVS', evt, name)
    if (evt === "update") em.emit("nav", name.replace("navs/", "/custom/"))
    /*
    if (name.split(".").slice(-1)[0] === "mdx")
      em.emit("recent-changes", {
        evt,
        name: name.slice(12, -4),
        date: Date.now(),
      })
    */
  })
}

module.exports = nav
