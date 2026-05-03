import { ILike, Repository } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
export class CountryService {
    private readonly countryRepository: Repository<Country>;
    private readonly cityRepository: Repository<City>;
    constructor(countryRepository: Repository<Country>, cityRepository: Repository<City>) {
        this.countryRepository = countryRepository;
        this.cityRepository = cityRepository;
    }

    async findCountryByCode(codePays: string): Promise<Country> {
        if (!codePays) {
            throw new ValidationError(`Country code is required`);
        }
        const country = await this.countryRepository.findOne({
            where: {
                code: ILike(`%${codePays}%`)
            }
        });
        if (!country) {
            throw new NotFoundError(`Country "${codePays}" does not exist`);
        }
        return country;
    }

    async findAllCountries(sort: string): Promise<Country[]> {
        if (sort && sort !== "name" && sort !== "-name") {
            throw new ValidationError(`Invalid sort value: ${sort}`);
        }
        const countries = await this.countryRepository.find({
            order: {
                name: sort === "name" ? "ASC" : "DESC"
            }
        });
        return countries;
    }
    async findCountryByName(name: string): Promise<Country> {
        const country = await this.countryRepository.findOne({
            where: {
                name: ILike(`%${name}%`)
            }
        });
        if (!country) {
            throw new NotFoundError(`Country "${name}" does not exist`);
        }
        return country;
    }

    async findCitiesByCountryCode(codePays: string): Promise<City[]> {
        const cities = await this.cityRepository.find({
            where: {
                country: {
                    code: codePays
                }
            }, relations:
                {
                    country: true
                } 
        });
        if (cities.length === 0) {
            throw new NotFoundError(`No cities found for country code "${codePays}"`);
        }
        return cities;
    }
}