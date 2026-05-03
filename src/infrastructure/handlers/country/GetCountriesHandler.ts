import { Context } from "hono";
//import { countries } from "@mock/Countries";
import { HTTPException } from 'hono/http-exception'

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Country } from "@domain/entities/Country";
export class GetCountriesHandler {
    async handle(c: Context) {
        const sort = c.req.query('sort') || "name";
        const countryname = c.req.query('countries[name]') || "";
        
        const countryRepository = AppDataSource.getRepository(Country);
        if (countryname) {
              //const filteredCountries = countries.filter(t => t.name.toLowerCase().includes(countryname.toLowerCase()));
            const filteredCountries = await countryRepository.findOne({
                where: {
                    name: ILike(`%${countryname}%`)
                }
            });
            if (!filteredCountries) {
                throw new HTTPException(404, { message: `No countries found with name like ${countryname}` });
            }
            return c.json({
                success: true,
                message: `Countries filtered by name: ${countryname}`,
                data: filteredCountries
            });
        }

        if (sort && sort !== "name" && sort !== "-name") {
            throw new HTTPException(400, { message : 'Invalid sort value:'});
        }
        const countries = await countryRepository.find({
            order: {
                name : sort === "name" ? "ASC" : "DESC"
            }
    });
        /*
        if (sort === "name") {
            countries.sort((a, b) => a.name.valueOf().localeCompare(b.name.valueOf()));
        } else if (sort === "-name") {countries}*/
        return c.json({
            success: true,
            message : 'All countries',
            data : countries
                }, 200); 
    }
}