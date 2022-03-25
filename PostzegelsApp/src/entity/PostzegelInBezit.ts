import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {Postzegel} from "./Postzegel";
import {Eigenaar} from "./Eigenaar";

@Entity()
export class PostzegelInBezit {
    @PrimaryGeneratedColumn() private _id: number;

    @ManyToMany(type => Eigenaar, eigenaar => eigenaar.postzegels, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    private _eigenaren: Eigenaar[];

    @Column({
        "nullable": true
    }) private _gegomd: boolean;

    @Column({
        "nullable": true
    }) private _postfris: boolean;

    @Column({
        "nullable": true
    }) private _aantal: number;

    @ManyToOne(() => Postzegel, postzegel => postzegel.postzegels_in_bezit, {
        eager: true,        // eager fetching
        cascade: false
    })
    @JoinTable()
    private _postzegel: Postzegel;

    //Getters & Setters
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get gegomd(): boolean {
        return this._gegomd;
    }

    set gegomd(value: boolean) {
        this._gegomd = value;
    }

    get aantal(): number {
        return this._aantal;
    }

    set aantal(value: number) {
        this._aantal = value;
    }


    get postzegel(): Postzegel {
        return this._postzegel;
    }

    set postzegel(value: Postzegel) {
        this._postzegel = value;
    }


    get postfris(): boolean {
        return this._postfris;
    }

    set postfris(value: boolean) {
        this._postfris = value;
    }


    get eigenaren(): Eigenaar[] {
        if (this._eigenaren == undefined) {
            this._eigenaren = new Array<Eigenaar>();
        }
        return this._eigenaren;
    }

    set eigenaren(value: Eigenaar[]) {
        if (this._eigenaren == undefined) {
            this._eigenaren = new Array<Eigenaar>();
        }
        this._eigenaren = value;
    }


}
