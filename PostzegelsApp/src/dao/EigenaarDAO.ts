import "typeorm";
import {getRepository, Repository} from "typeorm";
import {Eigenaar} from "../entity/Eigenaar";

export default class EigenaarDao {

    repo: Repository<Eigenaar>;

    async getEigenaarList() {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.find()
    }

    async addEigenaar(eigenaar) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.save(eigenaar);
    }

    async deleteEigenaar(id) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.delete(id);
    }

    async getEigenaarWithId(id) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.findOne(id);
    }

    //checkt of het repo geinit is
    async RepoBuilder() {
        if (this.repo == null) {
            this.repo = await getRepository(Eigenaar);
        } else return;
    }

}

