import { Repository } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";

export class StadiumService {
    private readonly stadiumRepository: Repository<Stadium>;
    private readonly matchRepository: Repository<Match>;
    constructor(stadiumRepository: Repository<Stadium>, matchRepository: Repository<Match>) {
        this.stadiumRepository = stadiumRepository;
        this.matchRepository = matchRepository;
    }

}