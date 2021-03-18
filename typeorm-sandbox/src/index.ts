import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {Users} from "./entity/Users";

createConnection().then(async () => {
    console.log("Loading users from the database...");
    const userRepository = getRepository(Users);
    const users = await userRepository.find({ relations: ["branch"] });
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
