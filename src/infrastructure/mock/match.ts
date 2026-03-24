import {BMO, SoFi, Estadio} from "./stadiums";
import {canada_equipe, usa_equipe, mexico_equipe, japon_equipe, argentine_equipe, ghana_equipe} from "./teams";
import {Match} from "../../domain/entities/Match";
import {MatchStatus} from "../../domain/entities/MatchStatus";
import {MatchStage} from "../../domain/entities/MatchStage";



export const m1 = new Match(
  1,
  canada_equipe,
  usa_equipe,
  0,      // homeScore
  0,      // awayScore
  BMO,
  MatchStatus.live,
  MatchStage.group,
  new Date("2026-05-09")
);

export const m2 = new Match(
  2,
  mexico_equipe,
  japon_equipe,
  0,
  0,
  SoFi,
  MatchStatus.live,
  MatchStage.group,
  new Date("2026-06-09")
);

export const m3 = new Match(
  3,
 argentine_equipe,
ghana_equipe,
  0,
  0,
  Estadio,
  MatchStatus.live,
  MatchStage.group,
  new Date("2026-06-09")
);




export const match: Array<Match> = [m1, m2, m3];





