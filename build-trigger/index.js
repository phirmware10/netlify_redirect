const express = require('express')
const superagent = require('superagent')

const app = express()

app.get('/', function (req, res) {
  res.json({ message: 'Listening' })
})

app.post('/', function (req, res) {
  res.json({ message: 'Cool' })
})

app.post('/dato-webhook/trigger-redirect-build', async function (req, res) {
  console.log('recieveing trigger', req.body)

  const triggerUrl = 'https://api.netlify.com/build_hooks/61ea98019f289bf7f404e725'

  const result = await superagent.post(triggerUrl)
  console.log(result, 'build trigger result')
  res.json({ message: 'Done' })
})

app.listen(3000, () => console.log('Listening on 3000'))
