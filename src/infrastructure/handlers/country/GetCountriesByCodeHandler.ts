import { Context } from "hono";
import { countries } from "@mock/Countries";

import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Country } from "@domain/entities/Country";
import { HTTPException } from "hono/http-exception";

export class GetCountriesByCodeHandler {
    async handle(c: Context) {
        const codePays = c.req.param('codeCountry') || "";
        const countryRepository = AppDataSource.getRepository(Country);
        if (!codePays) {
            throw new HTTPException(400, { message : 'Code country is required'});    
        }
        const countries = await countryRepository.findOne({
            where: {
                code: ILike(`%${codePays}%`)
            }
        });
        if (!countries) {
            throw new HTTPException(404, { message : `Country "${codePays}" does not exist`});
        }
        return c.json({
            success: true,
            message : `Country ${countries.name}`,
            data : countries
        }, 200); 
    }
}