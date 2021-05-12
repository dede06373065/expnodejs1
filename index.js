const express = require('express');
const app = express();
app.use(express.json());
app.use(cors);


const tasks = [];
let id = 1;


app.get('/tasks',(req,res)=>{
    const {description}=req.query;
    if(description){
        const filteredTask=tasks.filter((i)=>
        i.description.includes(description)
        );
        return res.json(filteredTask);
    }
    return res.json(tasks);
});


app.get('/tasks', (req, res) => {
    res.send(tasks);
});


app.get('/tasks', (req, res) => {
    const { id } = req.params;
    res.send(tasks.id);
});


app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find((i) => i.id === Number(id));
    if (!task) {
        return res.sendStatus(404);
    }
    return res.json(task);
});


app.post('/tasks', (req, res) => {
    const { description } = req.body;
    const task = { description, id: id++, done: false };
    tasks.push(task);
    return res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;
    let task = tasks.find((i) => i.id === Number(id));
    if (!task) {
        return res.sendStatus(404);
    }
    const newTask = {
        id: Number(id),
        description: description || task.description,
        done: !!done || task.done
    };
    const taskIndex = tasks.findIndex((i) => i.id === Number(id));
    tasks[taskIndex] = newTask;
    return res.json(newTask);
})

app.delete('/tasks/:id',(req,res)=>{
    const { id } = req.params;
    const taskIndex=tasks.findIndex((i)=>i.id===Number(id));
        if(taskIndex===-1){
            return res.sendStatus(404);
        }
        tasks.splice(taskIndex,1);
        return res.sendStatus(204);
})













app.listen(3000, () => {
    console.log('port 3000');
});

function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
}
