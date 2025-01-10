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
        const User = await this.findOne(id);
        if (User) return this.userRepository.remove(User);
        return null;
    }

    async update(id: string, user: User) {
        const User = await this.findOne(id);
        if (User) {
            user.password = await this.hashPassword(user.password);
            return this.userRepository.save(Object.assign(User, user));
        }
        return null;
    }

    async updatePost(id: string, post: Post) {
        const Post = await this.postRepository.findOne({where:{id}});
        if (Post) return this.postRepository.save(Object.assign(Post, post));
        return null;
    }

    async removePostByPostId( postId: string) {
        const post = await this.postRepository.findOne({where:{id:postId}});
        if (post) return this.postRepository.remove(post);
        return null;
    }

    // Hash user password before saving
    async hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }
}

