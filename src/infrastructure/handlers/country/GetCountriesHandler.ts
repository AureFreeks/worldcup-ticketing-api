import { Context } from "hono";
import { countries } from "infrastructure/mock/Countries";
import { HTTPException } from 'hono/http-exception'

export class GetCountriesHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const countryname = c.req.query('countries[name]') || "";
        const code = c.req.query('countries[name]')

        if (countryname) {
              const filteredCountries = countries.filter(t => t.name.toLowerCase().includes(countryname.toLowerCase()));
               return c.json({
                success: true,
                message: `Contries filtered by name: ${countryname}`,
                data: filteredCountries
            });
        }

        if (sort && sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, { message : 'Invalid sort value:'});
        }

        if (sort === "name") {
            countries.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {countries}
        return c.json({
            success: true,
            message : 'All countries',
            data : countries
                }, 200); 
    }
}