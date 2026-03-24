import { Context } from "hono";
import {match} from '../../mock/match'

export class GetMatchByIdHandler {
    async handle(c: Context) {
        const id = c.req.param('id');
        if (!match.find(m => m.id === parseInt(id))) {
            return c.json({
            success: false,
            error: `Match ${id} does not exist`
            }, 404);
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
