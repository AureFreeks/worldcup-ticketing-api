import { app } from "./app";

export default {
    port : Number(process.env.PORT),
    fetch : app.fetch

};

