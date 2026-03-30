import { Context } from "hono";
import { counrties } from "infrastructure/mock/Countries";

export class GetCountriesHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const countryname = c.req.query('countries[name]') || "";
        const code = c.req.query('countries[name]')

        if (countryname) {
              const filteredCountries = counrties.filter(t => t.name.toLowerCase().includes(countryname.toLowerCase()));
               return c.json({
                success: true,
                message: `Contries filtered by name: ${countryname}`,
                data: filteredCountries
            });
        }

        if (sort && sort !== "name" && sort !== "-name") {
            return c.json({
                success: false,
                message: 'Invalid sort value:'
            }, 400);
        }

        if (sort === "name") {
            counrties.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {counrties}
        return c.json({
            success: true,
            message : 'All countries',
            data : counrties
                }, 200); 

    



      
    }
}