export class FifaCode {
    readonly value:string;

    constructor(value:string) {
        if (!/^[A-Z]{3}$/.test(value)) { throw new Error("Code FIFA invalide : doit contenir 3 lettres majuscules"); }
        this.value=value;
    }
}