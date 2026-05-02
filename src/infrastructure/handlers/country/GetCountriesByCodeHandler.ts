import { Context } from "hono";
import { countries } from "@mock/Countries";

export class GetCountriesByCodeHandler {
    async handle(c: Context) {
        const codePays = c.req.param('codeCountry');
        return c.json({
            success: true,
            message : 'All countries',
            data : countries.find(c => c.code == codePays)
                }, 200); 
    }
}