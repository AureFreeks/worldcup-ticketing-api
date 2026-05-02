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
import { tickets } from "@mock/ticket";  
import { match } from "@mock/match";
import { Ticket } from "@domain/entities/Ticket";
import { Customer } from "@domain/entities/Customer";
import { id } from "zod/locales";
export class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();
        const parseResult = CreateTicketSchema.safeParse(body);
        if (!parseResult.success) {
            throw new HTTPException(400, { message : "Can't create ticket (wrong or missing values)", cause: parseResult.error.flatten(), });
        }
        const match_ticket = match.find(m => m.id === parseResult.data.matchId)
        if (!match_ticket) {
            throw new HTTPException(404, { message : `Match ${parseResult.data.matchId} does not exist`, cause: `No match with id ${parseResult.data.matchId}` });
        }
        if (tickets.find(t => t.match.id === parseResult.data.matchId && t.seat === parseResult.data.seat)) {
            throw new HTTPException(409, { message : `Seat '${parseResult.data.seat}' is already taken for match ${parseResult.data.matchId}`, cause: `Seat ${parseResult.data.seat} for match ${parseResult.data.matchId} is already booked` });
        }
        const id_ticket = tickets.length + 1;
        tickets.push(new Ticket(id_ticket, match_ticket, parseResult.data.seat, new Customer(parseResult.data.customer.firstname, parseResult.data.customer.lastname, parseResult.data.customer.email)));
        //Structure TD 4-2
        /*
        return c.json({
            "success": true,
            "message": "Ticket created",
            "data": {
                "matchId": parseResult.data.matchId,
                "seat": parseResult.data.seat,
                "holder": {
                    "firstname": parseResult.data.customer.firstname,
                    "lastname": parseResult.data.customer.lastname,
                    "email": parseResult.data.customer.email
                }
            }, 
        }, 201);
        */
        // Structure bruno et TD : 
        return c.json({
            "success": true,
            "message": "Ticket created",
            "data" : {
                "id": id_ticket,
                "match": {
                    "id": match_ticket.id
                },
                "seat": parseResult.data.seat,
                "holder": {
                    "firstname": parseResult.data.customer.firstname,
                    "lastname": parseResult.data.customer.lastname,
                    "email": parseResult.data.customer.email
                },
                "customer": {
                    "firstname": parseResult.data.customer.firstname,
                    "lastname": parseResult.data.customer.lastname,
                    "email": parseResult.data.customer.email
                }
            }
        }, 201);
    }
}