import { Injectable } from "@nestjs/common";
import { Cat } from './cats.entity'
import { InjectRepository, } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class CatsService {
    constructor(@InjectRepository(Cat) private catRepository: Repository<Cat> ) {}
    async findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

    async findOne(id: number): Promise<Cat> {
        return this.catRepository.findOne({where:{id}});
    }

    async create(cat: Cat) {
        this.catRepository.save(this.catRepository.create(cat));
    }

    async remove(id: number) {
       this.catRepository.delete(id);
    }

    async update(id: number, cat: Cat) {
        const Cat =await this.findOne(id);
        Object.assign(Cat, cat);
        return this.catRepository.save(Cat);
    }
}

