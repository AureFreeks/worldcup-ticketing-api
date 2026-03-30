import { Hono } from 'hono'

import { matchsRouter } from './routes/matchs'
import { teamsRouter } from './routes/teams'
import { homeRouter } from './routes/home'
import { stadiumsRouter } from './routes/stadiums'
import { citiesRouter } from './routes/cities'
export const app = new Hono()

app.route('/matchs', matchsRouter);
app.route('/teams', teamsRouter);
app.route('/stadiums', stadiumsRouter);
app.route('', homeRouter);
app.route('/cities', citiesRouter);
