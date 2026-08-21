import db from './db.js';
import express from 'express';

const app = express();
const PORT = 3000;

//Parse JSON bodies (as sent by API clients) -> instead of using data/end chunk-collecting
app.use(express.json());

//Get all tasks
app.get('/api/tasks', async (req, res) => {
   try {
    const tasks = await db.query('SELECT * FROM tasks');
    res.status(200).json(tasks.rows);
   } catch (err){
    console.error(err);
    res.status(500).json({error: 'Server error occured while fetching data.'});
   }
})

app.get('/api/tasks/:id', async (req,res) => {
    try{
        const userId = req.params.id
        console.log(userId)
        const query = 'SELECT * from tasks WHERE id = $1';
        const result = await db.query(query, [userId]);

        if(result.rows.length === 0){
            return res.status(404).json({error: 'User not found'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} )

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})