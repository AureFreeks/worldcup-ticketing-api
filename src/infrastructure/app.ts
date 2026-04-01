import { Hono } from 'hono'
export const app = new Hono()


import { HTTPException } from 'hono/http-exception'

app.onError((err : any, c : any) => {
    if (err instanceof HTTPException) {
        return c.json(
            {
                success: false,
                error : err.error,
                message : err.message
            },err.status
        )
    }
    console.error(err)
    return c.text('Internal Server Error', 500)
})


import { matchsRouter } from './routes/matchs'
import { teamsRouter } from './routes/teams'
import { homeRouter } from './routes/home'
import { stadiumsRouter } from './routes/stadiums'
import { citiesRouter } from './routes/cities'
import { countryRouter } from './routes/country'


app.route('/matchs', matchsRouter);
app.route('/teams', teamsRouter);
app.route('/stadiums', stadiumsRouter);
app.route('', homeRouter);
app.route('/cities', citiesRouter);
app.route('/countries',countryRouter)



