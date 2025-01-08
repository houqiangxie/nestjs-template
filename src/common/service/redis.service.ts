import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

Injectable()
@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager :Cache) { }

    async get<T>(key:string):Promise<T> {
        return this.cacheManager.get(key);
    }

    async set<T>(key:string,value:any,ttl:number):Promise<void> {
        return await this.cacheManager.set(key,value,ttl);
    }

    async del(key:string):Promise<boolean> {
        return await this.cacheManager.del(key);
    }

    // async reset():Promise<void> {
    //     return await this.cacheManager.reset();
    // }
}