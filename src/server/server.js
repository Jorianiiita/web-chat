const express = require('express')
const app = express()
const path = require('path')
const PORT = 8001

app.use('/static/build', express.static(path.join(__dirname + '/../../public/static/build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../public/index.html'))
})

app.listen(PORT, function () {
  console.log(`server is listening at port ${PORT}`)
})
