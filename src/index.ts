import { app } from "./infrastructure/app";

export default {
    port : Number(process.env.PORT),
    fetch : app.fetch

};

