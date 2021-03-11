import "reflect-metadata";
import {createConnection} from "typeorm";
import { Comment } from "./entity/Comment";
import {User} from "./entity/User";

createConnection({type: "sqlite",
database: `./db.sqlite`,
entities: [
    __dirname + "/entity/*.ts"
],
logging: true,
synchronize: true,

}).then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;

    
    await connection.manager.save(user);


    // Create a coment
    const comment = new Comment()
    comment.comment = 'Good job';
    comment.user = user;
    await connection.manager.save(comment);

    // Reply to that comment 
    const replyComment = new Comment()
    replyComment.comment = 'Well done';
    replyComment.user = user;
    replyComment.parent = comment
    await connection.manager.save(replyComment);


    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
