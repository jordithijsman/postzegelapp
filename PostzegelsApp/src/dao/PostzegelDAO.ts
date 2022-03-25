import "typeorm";
import "../entity/Postzegel.ts";
import {getRepository, Repository} from "typeorm";
import {Postzegel} from "../entity/Postzegel";

export default class PostzegelDao {

    repo: Repository<Postzegel>;

    async getPostzegelList() {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.find();
    }

    async getPostzegelsVanZoek(waar, id, omschrijving, naam, kleur, land) {
        await this.RepoBuilder();
        let answ;
        if (waar == "eigen") {
            console.log("eigen nog niet geïmplementeerd");
        }
        answ = this.repo.createQueryBuilder().select("postzegel").from(Postzegel, "postzegel");

        if (id != "NULL") {
            answ = answ.where("LOWER(postzegel._id) like LOWER (:i)", {i: `%${id}%`})
        }

        if (omschrijving != "NULL") {
            //console.log("omschrijving: " + omschrijving)
            answ = answ.andWhere("LOWER(postzegel._omschrijving) like LOWER(:om)", {om: `%${omschrijving}%`})
        }
        if (naam != "NULL") {
            answ = answ.andWhere("LOWER(postzegel._naam) like LOWER(:nm)", {nm: `%${naam}%`})
        }
        if (kleur != "NULL") {
            answ = answ.andWhere("LOWER(postzegel._kleur) like LOWER(:kl)", {kl: `%${kleur}%`})
        }
        if (land != "NULL") {
            answ = answ.andWhere("LOWER(postzegel._land) like LOWER(:la)", {la: `%${land}%`})
        }

        return answ.getMany();
    }

    async addPostzegel(postzegel) {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.save(postzegel);
    }

    async addPostzegels(postzegels) {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.save(postzegels);
    }

    async deletePostzegel(id) {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.delete(id);
    }

    async getPostzegelWithId(id) {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.findOne(id);
    }

    async updatePostzegel(postzegel) {
        await this.RepoBuilder(); // get repo if it's not defined
        return this.repo.save(postzegel)
    }

    async RepoBuilder() {
        if (this.repo == null) {
            this.repo = await getRepository(Postzegel);
        } else return;
    }

}

