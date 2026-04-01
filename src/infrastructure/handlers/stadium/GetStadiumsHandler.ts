import { Context } from "hono";
import {stadiums} from "../../mock/stadiums";
import { city } from "infrastructure/mock/cities";
import { $ } from "bun";

export class GetStadiumsHandler {
    async handle(c: Context) {
        const cityName = c.req.query('city[name]') || "";
        const countryCode = c.req.query('country[code]') || "";
        const counstryName = c.req.query('country[name]') || "";
        const name = c.req.query('name') || "";
        if (name) {
            const filteredStadiums = stadiums.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by name: ${name}`,
                data: filteredStadiums
            }, 200);
        }
        if (cityName) {
            const filteredStadiums = stadiums.filter(s => s.city.name.toLowerCase().includes(cityName.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by city[name]:`,
                cityName : cityName,
                data: filteredStadiums
            },200);
        }
        if (countryCode) {
            const filteredStadiums = stadiums.filter(s => s.city.country.code.toLowerCase().includes(countryCode.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by country[code]:`,
                data: filteredStadiums
            },200);
        }
        if (counstryName) {
            const filteredStadiums = stadiums.filter(s => s.city.country.name.toLowerCase().includes(counstryName.toLowerCase()));
            return c.json({
                success: true,
                message: `Stadiums filtered by country[name]:`,
                data: filteredStadiums
            },200);
        }
        return c.json({
            success: true,
            message : 'All stadiums',
            data : stadiums
        }, 200);
    }
}

