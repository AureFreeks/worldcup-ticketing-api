class Stadium {
    name:String;
    city:City;
    capacity:number;

    constructor(name:String,city:City,cap:number) {
        this.name=name;
        this.city=city;
        this.capacity=cap;
        if (this.capacity<0) {throw Error("capacity nule ou negative")}
}} 