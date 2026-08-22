import db from './db.js';
import express from 'express';

const app = express();
const PORT = 3000;

//Parse JSON bodies (as sent by API clients) -> instead of using data/end chunk-collecting
app.use(express.json());

//Get all tasks
app.get('/api/tasks', async (req, res) => {
   try {
    const tasks = await db.query('SELECT * FROM tasks ORDER BY id');
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

        if(result.rowCount === 0){
            return res.status(404).json({error: 'Task not found'});
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
            return res.status(404).json({ message : 'Task not found'});
        }

        res.status(200).json({ message: 'Task successfully deleted'})
    } catch (error){
        res.status(500).json({ error: 'Internal Server Error'});
    }
})

app.patch('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const allowedColumns = ['title','is_done']

    //Returns array of keys of object
    const keys = Object.keys(updates); 

    if(keys.length === 0 ){
        return res.status(400).json({ error: 'No fields provided for update.'});
    }

    if (!keys.every(key => allowedColumns.includes(key))) {
        return res.status(400).json({ error: 'Invalid field provided' });
    }

    try{
        //Returns Key with updates index for DB query Eg. "name" = $1 
        const setClause = keys.map((key, index) => `"${key}" = $${index + 1}`).join(',');

        //Returns query values array
        const queryValues = Object.values(updates);

        //Last position is the id
        queryValues.push(id);

        const idParamIndex = queryValues.length;

        const query = `UPDATE tasks SET ${setClause} WHERE id = $${idParamIndex} RETURNING *`;

        const result = await db.query(query, queryValues);

        if (result.rowCount === 0 ){
            return res.status(404).json({ error: 'Task not found.'});
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
})

app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;

    if(!title){
        return res.status(400).json({ error: 'Task name is required' });
    }

    try {
        const query = 'INSERT INTO tasks (title) VALUES ($1) RETURNING *';
        const values = [title];

        const result = await db.query(query, values);

        res.status(201).json({
            message: 'Task created successfully',
            task: result.rows[0],
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while inserting data' });
    }
})

app.listen(PORT, function (err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})