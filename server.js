const express = require('express');
const app = express();
const PORT = 3000;

//Parse JSON bodies (as sent by API clients) -> instead of using data/end chunk-collecting
app.use(express.json());

//Get all tasks
app.get('/api/tasks', (req, res) => {
    res.send('Hello world');
})

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})