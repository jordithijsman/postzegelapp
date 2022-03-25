import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contactgegevens {
    //Zelfde ID als Eignaar
    @PrimaryColumn()
    _email: String;

    @Column({
        "nullable": true
    }) private _telefoonnr: string;

    @Column({
        "nullable": true
    }) private _gemeente: string;

    @Column({
        "nullable": true
    }) private _postcode: number;

    @Column({
        "nullable": true
    }) private _straat: string;

    @Column({
        "nullable": true
    }) private _huisnr: number;

    //Getters & Setters
    get email(): String {
        return this._email;
    }

    set email(value: String) {
        this._email = value;
    }

    get telefoonnr(): string {
        return this._telefoonnr;
    }

    set telefoonnr(value: string) {
        this._telefoonnr = value;
    }

    get gemeente(): string {
        return this._gemeente;
    }

    set gemeente(value: string) {
        this._gemeente = value;
    }

    get postcode(): number {
        return this._postcode;
    }

    set postcode(value: number) {
        this._postcode = value;
    }

    get straat(): string {
        return this._straat;
    }

    set straat(value: string) {
        this._straat = value;
    }

    get huisnr(): number {
        return this._huisnr;
    }

    set huisnr(value: number) {
        this._huisnr = value;
    }
}
