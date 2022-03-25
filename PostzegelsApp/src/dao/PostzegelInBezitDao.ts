import "typeorm";
import "../entity/Postzegel.ts";
import {getRepository, Repository} from "typeorm";
import {PostzegelInBezit} from "../entity/PostzegelInBezit";
import {ws} from "../index"
import {parse, stringify, toJSON, fromJSON} from 'flatted';

export default class PostzegelInbezitDao {

    repo: Repository<PostzegelInBezit>;

    async getPostzegelInBezitList() {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.find()
    }

    async addPostzegelInBezit(postzegel) {
        await this.RepoBuilder() // get repo if it's not defined
        let ret = this.repo.save(postzegel);
        ret.then(() => {
            //send new postzegel to clients
            for (const wsKey of ws) {
                wsKey.send(stringify(postzegel.postzegel));
            }
        })
        return ret;
    }

    async deletePostzegelInBezit(id) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.delete(id);
    }

    async getPostzegelInBezitWithId(id) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.findOne(id);
    }

    async updatePostzegelInBezit(postzegel) {
        await this.RepoBuilder() // get repo if it's not defined
        return this.repo.save(postzegel)
    }

    async RepoBuilder() {
        if (this.repo == null) {
            this.repo = await getRepository(PostzegelInBezit);
        } else return;
    }

}

