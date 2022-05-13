import express from 'express';
import { remultExpress } from 'remult/remult-express';
import { Person } from '../shared/Person';

let app = express();
app.use(remultExpress({
    entities:[Person]
}));

app.listen(3002, () => console.log("Server started"));