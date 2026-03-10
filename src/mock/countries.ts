import { Country } from "../domain/entities/Country";

export const mexico = {name:"Mexico", code:"me"} as const;
export const usa = {name:"USA", code:"us"} as const;
export const canada = {name:"Canada", code:"ca"} as const;

export const counrties : Array<Country> = [mexico, usa, canada]