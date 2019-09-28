var channels = require("../../../channels")

const ApiSse = (req, res) => {
  const { channel } = req.query
  if (!channels[channel])
    return res.status(500).json({ error: "What the!", channel })
  channels[channel].addClient(req, res)
}

export default ApiSse
