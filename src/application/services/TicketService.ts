import { Repository } from "typeorm";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";

import * as z from "zod";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";

export const CreateTicketSchema = z.object({
    matchId: z.number().int().positive(),         
    seat: z.string().min(1).max(10),              
    customer: z.object({
        firstname: z.string().min(1),             
        lastname: z.string().min(1),              
        email: z.string().email()                 
    })
})

export class TicketService {
    private readonly ticketRepository: Repository<Ticket>;
    private readonly matchRepository: Repository<Match>;
    constructor(ticketRepository: Repository<Ticket>, matchRepository: Repository<Match>) {
        this.ticketRepository = ticketRepository;
        this.matchRepository = matchRepository;
    }

    async verifierShemas(body: any) {
        const parseResult = CreateTicketSchema.safeParse(body);
        if (!parseResult.success) {
            throw new ValidationError(`Can't create ticket (wrong or missing values)`);
        }
        return parseResult.data;
    }

    async matchExist(matchId: number) {
        const match_ticket = await this.matchRepository.findOne({
            where: {
                id: matchId
            }
        });
        if (!match_ticket) {
            throw new NotFoundError(`Match ${matchId} does not exist`);
        }
        return match_ticket;
    }

    async existingTicket(matchId: number, seat: string) {
        const existingTicket = await this.ticketRepository.findOne({
            where: {
                match: {
                    id: matchId
                },
                seat: seat
            }
        });
        if (existingTicket) {
            throw new ConflictError(`Seat '${seat}' is already taken for match ${matchId}`);
        }
    }

    async createTicket(body: any) {
        return this.ticketRepository.save(
            new Ticket(
                body.matchId,
                body.seat,
                body.customer.firstname,
                body.customer.lastname,
                body.customer.email
            )
        );
    }

}