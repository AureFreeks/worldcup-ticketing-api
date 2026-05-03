import { Repository } from "typeorm";
import { City } from "@domain/entities/City";
export class CityService {
    private readonly cityRepository: Repository<City>;
    constructor(cityRepository: Repository<City>) {
        this.cityRepository = cityRepository;
    }

}