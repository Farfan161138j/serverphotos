import { User } from "../../domain/user";
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from "../../domain/user.repository";
import { CreateUserDto } from "./create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CreateUserService{

    constructor (
        @Inject(UserRepository)
        private readonly userrepository : UserRepository,
    ){}
}

