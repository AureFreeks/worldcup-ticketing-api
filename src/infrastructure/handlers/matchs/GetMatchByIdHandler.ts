import { Context } from "hono";
import {match} from '../../mock/match'
import { HTTPException } from 'hono/http-exception'

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = c.req.param('id');
        if (!match.find(m => m.id === parseInt(id))) {
            throw new HTTPException(404, { message : `Match ${id} does not exist`});
        }
            return c.json({
                success: true,
                message: `Match ${id}`,
                data: { 
                    id : parseInt(id)    
                }
            }, 200);
    }
}
