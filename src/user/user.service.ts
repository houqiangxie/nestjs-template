import { Injectable } from "@nestjs/common";
import { User } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import * as bcrypt from 'bcryptjs';
import { paginate,PaginatedResult } from "src/common/pagination";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }
    async findAll(): Promise<PaginatedResult<User>> {
        const query = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'post');
        return await paginate(query, { page: 1, pageSize: 10 });
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({where:{id},relations:['posts']});
    }

    async create(user: User) {
        return await this.userRepository.save(user);
    }

    async remove(id: string) {
        await this.userRepository.delete(id);
        return null;
    }

    async update(id: string, user: User) {
        await this.userRepository.update(id, user);
        return null;
    }

    async updatePost(id: string, post: Post) {
        await this.postRepository.update(id, post);
        return null;
    }

    async removePostByPostId( postId: string) {
        await this.postRepository.delete(postId);
        return null;
    }

    // Hash user password before saving
    async hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }
}

