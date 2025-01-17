 import {app} from './app.js';
import { config } from "dotenv";
import { conn } from './data/dbconn.js';
config({
    path:'./config.env'
})
const port = process.env.PORT
conn()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});