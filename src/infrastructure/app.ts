import { Hono } from 'hono'

import { matchsRouter } from './routes/matchs'
import { teamsRouter } from './routes/teams'
import { homeRouter } from './routes/home'

export const app = new Hono()

app.route('/matchs', matchsRouter);
app.route('/teams', teamsRouter);
app.route('', homeRouter);