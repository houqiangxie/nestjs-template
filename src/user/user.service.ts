import { Injectable } from "@nestjs/common";
import { User } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    async findAll():Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({where:{id}});
    }

    async create(user: User) {
        return this.userRepository.save(this.userRepository.create(user));
    }

    async remove(id: number) {
        await this.userRepository.delete(id);
    }

    async update(id: number, user: User) {
        const User = await this.findOne(id);
        Object.assign(User, user);
        return this.userRepository.save(User);
    }
}

