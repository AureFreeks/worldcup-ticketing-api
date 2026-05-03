import { Hono } from 'hono'
import { GetTeamByFifaCodeHandler } from '@handlers/teams/GetTeamByFifaCodeHandler';
import { GetTeamMatchsByFifaCodeHandler } from '@handlers/teams/GetTeamMatchsByFifaCodeHandler'
import { GetTeamsHandler } from '@handlers/teams/GetTeamsHandler';
import { GetTeamMatchsByStageHandler } from '@handlers/teams/GetTeamMatchsByStageHandler';
export const teamsRouter = new Hono()

teamsRouter.get('',(c) => new GetTeamsHandler().handle(c));
teamsRouter.get('/:fifaCode/matchs/:stage', (c) => new GetTeamMatchsByStageHandler().handle(c));
teamsRouter.get('/:fifaCode/matchs', (c) => new GetTeamMatchsByFifaCodeHandler().handle(c));
teamsRouter.get('/:fifaCode', (c) => new GetTeamByFifaCodeHandler().handle(c));
