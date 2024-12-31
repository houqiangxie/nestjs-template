import { Injectable } from "@nestjs/common";
import { User } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Post} from "./post.entity";
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }
    async findAll():Promise<User[]> {
        return this.userRepository.find({relations:['posts']});
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({where:{id},relations:['posts']});
    }

    async create(user: User) {
        const posts = user.posts.map(post => this.postRepository.create(post));
        return await this.userRepository.save(this.userRepository.create({...user,posts}));
    }

    async remove(id: string) {
        const User = await this.findOne(id);
        if (User) return this.userRepository.remove(User);
        return null;
    }

    async update(id: string, user: User) {
        const User = await this.findOne(id);
        if (User) {
            const posts = user.posts.map(post => this.postRepository.create(post));
            return this.userRepository.save(Object.assign(User, user, {posts}));
        }
        return null;
    }

    async updatePost(id: string, post: Post) {
        const User = await this.findOne(id);
        if (User) {
            const Post = User.posts.find(post => post.id === post.id);
            if (Post) {
                Object.assign(Post, post);
                return this.userRepository.save(User);
            }else  return this.userRepository.save(Object.assign(User, {posts: [...User.posts, post]}));
        }
        return null;
    }

    async removePostByPostId( postId: string) {
        const post = await this.postRepository.findOne({where:{id:postId}});
        if (post) return this.postRepository.remove(post);
        return null;
    }
}

