import { Repository } from "typeorm";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";

export class TicketService {
    private readonly ticketRepository: Repository<Ticket>;
    private readonly matchRepository: Repository<Match>;
    constructor(ticketRepository: Repository<Ticket>, matchRepository: Repository<Match>) {
        this.ticketRepository = ticketRepository;
        this.matchRepository = matchRepository;
    }

}