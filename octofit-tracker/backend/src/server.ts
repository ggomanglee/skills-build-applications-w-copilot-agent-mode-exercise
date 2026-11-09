import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173'

app.use(express.json())
app.use((request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', frontendOrigin)
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api', apiRouter)

const handleError: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
}

app.use(handleError)

await connectDatabase()
app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`)
})