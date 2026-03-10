export class FifaCode {
    readonly value:string;

    constructor(value:string) {
        if (!/^[A-Z]{3}$/.test(value)) {Error}
        this.value=value;
    }
}