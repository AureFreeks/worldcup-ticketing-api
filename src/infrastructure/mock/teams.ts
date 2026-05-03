import { Team } from "@domain/entities/Team";
import { FifaCode } from "@domain/value-object/FifaCode";

export const canada_equipe = new Team("Canada", new FifaCode("CAN"));
export const usa_equipe = new Team("USA", new FifaCode("USA"));
export const mexico_equipe = new Team("Mexico", new FifaCode("MEX"));
export const japon_equipe = new Team("Japon", new FifaCode("JPN"));
export const argentine_equipe = new Team("Argentine", new FifaCode("ARG"));
export const ghana_equipe = new Team("Ghana", new FifaCode("GHA"));
export const france_equipe = new Team("France", new FifaCode("FRA"));

export const teams: Array<Team> = [
    canada_equipe, usa_equipe, mexico_equipe,
    japon_equipe, argentine_equipe, ghana_equipe, france_equipe
];