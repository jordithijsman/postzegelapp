import {Postzegel} from "./Postzegel";
import {ChildEntity, Column} from "typeorm";

@ChildEntity()
export class PostzegelCode extends Postzegel {
    @Column({"type": "varchar"}) private _prijs: String;

    //Getters & Setters

    get prijs(): String {
        return this._prijs;
    }

    set prijs(value: String) {
        this._prijs = value;
    }
}

