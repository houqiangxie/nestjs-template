import { Injectable } from "@nestjs/common";
import { CreateCatDto } from './cats.interface'
@Injectable()
export class CatsService {
    private readonly cats: CreateCatDto[] = [];
    findAll(): CreateCatDto[] {
        return this.cats;
    }

    findOne(id: number): CreateCatDto {
        return this.cats[id];
    }

    create(cat: CreateCatDto) {
        this.cats.push(cat);
    }

    remove(id: number) {
        this.cats.splice(id, 1);
    }

    update(id: number, cat: CreateCatDto) {
        if(this.cats[id])this.cats[id] = cat;
    }
}

