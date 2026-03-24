import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from 'infrastructure/handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamsHandler } from 'infrastructure/handlers/teams/GetTeamsHandler';
export const teamsRouter = new Hono()

teamsRouter.get('',(c) => new GetTeamsHandler().handle(c));

teamsRouter.get('/:fifaCode', (c) => new GetTeamByFifaCodeHandler().handle(c));