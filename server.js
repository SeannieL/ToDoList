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
        const { id } = req.params;
        console.log(userId)
        const query = 'SELECT * from tasks WHERE id = $1';
        const result = await db.query(query, [id]);

        if(result.rows.length === 0){
            return res.status(404).json({error: 'User not found'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

app.delete('/api/tasks/:id', async (req,res) => {
    const { id } = req.params;

    try{
        //Query returns the affect row
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        
        if(result.rowCount === 0){
            return res.status(404).json({ message : 'User not found'});
        }

        res.status(200).json({ message: 'User successfully deleted'})
    } catch (error){
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})