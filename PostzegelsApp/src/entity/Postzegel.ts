import {Column, Entity, Index, OneToMany, PrimaryColumn, TableInheritance, JoinTable, JoinColumn} from "typeorm";
import {PostzegelInBezit} from "./PostzegelInBezit";

/*

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="postzegel_type", discriminatorType = DiscriminatorType.STRING)

 */

@Entity()
@TableInheritance({column: {type: "varchar", name: "type"}})
export class Postzegel {

    //Dit is niet generated!! Postzegels hebben een specifieke ID
    @Index()
    @PrimaryColumn() private _id: String;

    @Column({
        "nullable": true
    }) private _omschrijving: string;

    @Column({
        "nullable": true
    }) private _naam: string;

    @Column({
        "nullable": true
    }) private _kleur: string;

    @Column({
        "nullable": true
    }) private _tanding: string;

    @Column({
        "nullable": true
    }) private _datum: Date;

    @Column({
        "nullable": true
    }) private _land: string;

    @Column({
        "nullable": true,
        "type": "float8"
    }) private _waarde_postfris: number;        //Altijd in euro

    @Column({
        "nullable": true,
        "type": "float8"
    }) private _waarde_gestempeld: number;      //Altijd in euro

    @OneToMany(() => PostzegelInBezit, postzegelinbezit => postzegelinbezit.postzegel,
        {cascade: false})
    @JoinTable()
    private _postzegels_in_bezit: PostzegelInBezit[];


    //Getters & Setters
    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value;
    }

    get omschrijving(): string {
        return this._omschrijving;
    }

    set omschrijving(value: string) {
        this._omschrijving = value;
    }

    get naam(): string {
        return this._naam;
    }

    set naam(value: string) {
        this._naam = value;
    }

    get tanding(): string {
        return this._tanding;
    }

    set tanding(value: string) {
        this._tanding = value;
    }

    get datum(): Date {
        return this._datum;
    }

    set datum(value: Date) {
        this._datum = value;
    }

    get land(): string {
        return this._land;
    }

    set land(value: string) {
        this._land = value;
    }


    get postzegels_in_bezit(): PostzegelInBezit[] {
        if (this._postzegels_in_bezit == undefined) {
            this._postzegels_in_bezit = new Array<PostzegelInBezit>();
        }
        return this._postzegels_in_bezit;
    }

    set postzegels_in_bezit(value: PostzegelInBezit[]) {
        if (this._postzegels_in_bezit == undefined) {
            this._postzegels_in_bezit = new Array<PostzegelInBezit>();
        }
        this._postzegels_in_bezit = value;
    }

    add_postzegel_in_bezit(value: PostzegelInBezit) {
        this._postzegels_in_bezit.push(value);
    }


    get kleur(): string {
        return this._kleur;
    }

    set kleur(value: string) {
        this._kleur = value;
    }

    get waarde_postfris(): number {
        return this._waarde_postfris;
    }

    set waarde_postfris(value: number) {
        this._waarde_postfris = value;
    }

    get waarde_gestempeld(): number {
        return this._waarde_gestempeld;
    }

    set waarde_gestempeld(value: number) {
        this._waarde_gestempeld = value;
    }


}
