import * as z from "zod";

export const CreateTicketSchema = z.object({
    matchId: z.number().int().positive(),         
    seat: z.string().min(1).max(10),              
    customer: z.object({
        firstname: z.string().min(1),             
        lastname: z.string().min(1),              
        email: z.string().email()                 
    })
})

import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
import { Ticket } from "@domain/entities/Ticket";


import { AppDataSource } from "@database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { TicketService } from "@services/TicketService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";

const matchRepository = AppDataSource.getRepository(Match);
const ticketRepository = AppDataSource.getRepository(Ticket);
const ticketService = new TicketService(ticketRepository, matchRepository);

export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();
        try{
            const parseResult = await ticketService.verifierShemas(body);
            const match_ticket = await ticketService.matchExist(parseResult.matchId);
            await ticketService.existingTicket(parseResult.matchId, parseResult.seat);
            const ticket = await ticketService.createTicket(parseResult); 
            return c.json({
                        "success": true,
                        "message": "Ticket created",
                        "data" : {
                            "id": ticket.id,
                            "match": {
                                "id": match_ticket.id
                            },
                            "seat": parseResult.seat,
                            "firstname": parseResult.customer.firstname,
                            "lastname": parseResult.customer.lastname,
                            "email": parseResult.customer.email
                        }
            }, 201);
        }
        catch (error) {
            if (error instanceof ValidationError) {
                throw new HTTPException(400, { message : error.message});
            }
            if (error instanceof NotFoundError) {
                throw new HTTPException(404, { message : error.message});
            }
            if (error instanceof ConflictError) {
                throw new HTTPException(409, { message : error.message});
            }
            throw new HTTPException(500, { message : "An unexpected error occurred while creating the ticket" });
        }
    }
}