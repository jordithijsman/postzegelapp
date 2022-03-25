import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Contactgegevens} from "./Contactgegevens";
import {PostzegelInBezit} from "./PostzegelInBezit";
import {Postzegel} from "./Postzegel";
import postzegelinbezit from "../routes/postzegelinbezit";

@Entity()
export class Eigenaar {
    @PrimaryColumn()
    _id: String;

    @OneToOne(() => Contactgegevens, {cascade: true})
    @JoinColumn({name: "_id"})
    _gegevens: Contactgegevens;

    @BeforeInsert()
    newid() {
        this.id = this.gegevens.email
    }

    @Column() private _naam: string;

    @Column() private _voornaam: string;

    @ManyToMany(type => PostzegelInBezit, postzegelinbezit=>postzegelinbezit.eigenaren, {
        cascade: true
    })
    @JoinTable()
    private _postzegels: PostzegelInBezit[];


    //Getters & Setters
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get naam(): string {
        return this._naam;
    }

    set naam(value: string) {
        this._naam = value;
    }

    get voornaam(): string {
        return this._voornaam;
    }

    set voornaam(value: string) {
        this._voornaam = value;
    }


    get gegevens(): Contactgegevens {
        return this._gegevens;
    }

    set gegevens(value: Contactgegevens) {
        this._gegevens = value;
    }


    get postzegels(): PostzegelInBezit[] {
        if(this._postzegels == undefined){
            this._postzegels = new Array<PostzegelInBezit>();
        }
        return this._postzegels;
    }

    set postzegels(value: PostzegelInBezit[]) {
        if(this._postzegels == undefined){
            this._postzegels = new Array<PostzegelInBezit>();
        }
        this._postzegels = value;
    }


}
