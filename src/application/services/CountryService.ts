import { Repository } from "typeorm";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
export class CountryService {
    private readonly countryRepository: Repository<Country>;
    private readonly cityRepository: Repository<City>;
    constructor(countryRepository: Repository<Country>, cityRepository: Repository<City>) {
        this.countryRepository = countryRepository;
        this.cityRepository = cityRepository;
    }

}