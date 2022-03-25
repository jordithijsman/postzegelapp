import {Postzegel} from "./Postzegel";
import {ChildEntity, Column} from "typeorm";

@ChildEntity()
export class PostzegelFrank extends Postzegel {
    @Column({"type": "float8"}) private _prijs: number;

    //Getters & Setters

    get prijs(): number {
        return this._prijs;
    }

    set prijs(value: number) {
        this._prijs = value;
    }
}

