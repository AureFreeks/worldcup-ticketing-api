import { Hono } from 'hono'
import { CreateTicketHandler } from '@handlers/tickets/CreateTicketHandlers';

export const ticketsRouter = new Hono();

ticketsRouter.post('/', async (c) => new CreateTicketHandler().handle(c));