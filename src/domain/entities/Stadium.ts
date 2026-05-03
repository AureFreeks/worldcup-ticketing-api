import {City} from "@domain/entities/City";
import { Column, Entity, ManyToOne, PrimaryColumn} from "typeorm"

@Entity()
export class Stadium {
    @PrimaryColumn()
    name:String;

    @ManyToOne(() => City)
    city:City;
    @Column()
    capacity:number;

    constructor(name:String,city:City,cap:number) {
        this.name=name;
        this.city=city;
        this.capacity=cap;
        if (this.capacity<0) {throw Error("capacity nule ou negative")}
}} 