import "reflect-metadata";
import {createConnection} from "typeorm";
import app from "./app";

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
}

createConnection().then(async () => {
    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
}).catch(error => console.log(error));
