import { app } from "@infrastructure/app";
import {AppDataSource} from "@database/AppDataSource";
import "reflect-metadata"; //typeorm
import { process } from "zod/v4/core";


AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
    console.log(`Server is running on port ${process.env.PORT}`);
    }).catch((err) => {
    console.error("Can't connect to the database", err);
    process.exit(1);
});

export default {
    port : Number(process.env.PORT),
    fetch : app.fetch

};

