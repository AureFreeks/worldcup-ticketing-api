import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { ILike } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { StadiumService } from "@services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { Match } from "@domain/entities/Match";

const stadiumRepository = AppDataSource.getRepository(Stadium);
const matchRepository = AppDataSource.getRepository(Match);
const stadiumService = new StadiumService(stadiumRepository, matchRepository);

export class GetStadiumsHandler {
    async handle(c: Context) {
        const cityName = c.req.query('city[name]') || "";
        const countryCode = c.req.query('country[code]') || "";
        const countryName = c.req.query('country[name]') || "";
        const name = c.req.query('name') || "";
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        if (name) {
            try {
                const stadium = await stadiumService.findStadiumByName(name);
                return c.json({
                    success: true,
                    message: `Stadiums filtered by name: ${name}`,
                    data: stadium
                }, 200);
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message : error.message });
                }
                throw new HTTPException(500, { message: 'An unexpected error occurred' });
            }   
        }
        if (cityName) {
            try {
                const stadiums = await stadiumService.findStadiumsByCityName(cityName);
                return c.json({
                    success: true,
                    message: `Stadiums filtered by city[name]: ${cityName}`,
                    data: stadiums
                }, 200);
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message : error.message });
                }
                throw new HTTPException(500, { message: 'An unexpected error occurred' });
            }
        }
        if (countryCode) {
            const filteredStadiums = await stadiumRepository.find({
                where : {
                    city : {
                        country :{ 
                            code : ILike(`%${countryCode}%`)
                        }
                    }
                },
                relations : {
                    city: {
                        country : true
                    }
                }
            });
            //const filteredStadiums = stadiums.filter(s => s.city.country.code.toLowerCase().includes(countryCode.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by country[code]:`,
                data: filteredStadiums
            },200);
        }
        if (countryName) {
            try {
                const stadiums = await stadiumService.findStadiumsByCountryName(countryName);
                return c.json({
                    success: true,
                    message: `Stadiums filtered by country[name]: ${countryName}`,
                    data: stadiums
                }, 200);
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message : error.message });
                }                
                throw new HTTPException(500, { message: 'An unexpected error occurred' });
            }
        }
        try {
                const stadiums = await stadiumService.findAllStadiums();
                return c.json({
                    success: true,
                    message : 'All stadiums',
                    data : stadiums
                }, 200);
            }
            catch (error) {
                if (error instanceof NotFoundError) {
                    throw new HTTPException(404, { message : error.message });
                }                
                throw new HTTPException(500, { message: 'An unexpected error occurred' });
            }
    }
}

