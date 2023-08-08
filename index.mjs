import debug from 'debug'

import express from 'express'

const log = debug('react-web-components')

const app = express()
const port = 3000

app.use('/assets', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' })
})

app.listen(port, () => { log(port) })
