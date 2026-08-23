import db from './src/config/db.js';
import router from './src/routes/tasks.routes.js';
import express from 'express';

const app = express();
const PORT = 3000;

//Parse JSON bodies (as sent by API clients) -> instead of using data/end chunk-collecting
app.use(express.json());

app.use('/api/tasks', router)

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})