import {Team} from "../../domain/entities/Team";
import { FifaCode } from "domain/value-object/FifaCode";

export const canada_equipe = {name:"Canada", code:new FifaCode("CAN")} as const;
export const usa_equipe = {name:"USA", code:new FifaCode("USA")} as const;
export const mexico_equipe = {name:"Mexico", code:new FifaCode("MEX")} as const;
export const japon_equipe = {name:"Japon", code:new FifaCode("JPN")} as const;
export const argentine_equipe = {name:"Argentine", code:new FifaCode("ARG")} as const;
export const ghana_equipe = {name:"Ghana", code:new FifaCode("GHA")} as const;
export const france_equipe = {name:"France", code:new FifaCode("FRA")} as const;

export const teams : Array<Team> = [canada_equipe, usa_equipe, mexico_equipe, japon_equipe, argentine_equipe, ghana_equipe, france_equipe];