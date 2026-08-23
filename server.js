import router from './src/routes/tasks.routes.js';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

const corsOptions = {
origin: 'http://localhost:5173', // Allow only your React app's origin
  methods: 'GET,POST,PUT,DELETE',  // Explicitly allow these HTTP methods
  credentials: true                // Allow cookies/auth headers if needed
};


//Global cors
app.use(cors(corsOptions));

//Parse JSON bodies (as sent by API clients) -> instead of using data/end chunk-collecting
app.use(express.json());

app.use('/api/tasks', router)

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})