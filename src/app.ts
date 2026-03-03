import { Hono } from 'hono'

export const app = new Hono()

app.get('/', (c) => c.json({
  success: true,
  message: 'World Cup Ticketing API'
}))

