import { Injectable } from "@nestjs/common";
import { UserEntity } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}
    async findAll():Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({where:{id}});
    }

    async create(user: UserEntity) {
        return this.userRepository.save(this.userRepository.create(user));
    }

    async remove(id: number) {
        await this.userRepository.delete(id);
    }

    async update(id: number, user: UserEntity) {
        const userEntity = await this.findOne(id);
        Object.assign(userEntity, user);
        return this.userRepository.save(userEntity);
    }
}

